import {
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  aws_s3 as s3,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface NotesApiProps {
  /** the dynamodb table to be passed to lambda function **/
  table: dynamodb.Table;
  /** the actions which should be granted on the table */
  grantActions: string[];
}

export class NotesApi extends Construct {
  /** allows accessing the counter function */
  public readonly handler: lambda.Function;

  constructor(scope: Construct, id: string, props: NotesApiProps) {
    super(scope, id);

    const { table, grantActions } = props;

    const isLocalDev = ["true", true].includes(process.env.IS_LOCAL_DEV);

    const codeConfig = isLocalDev
      ? lambda.Code.fromBucket(
          s3.Bucket.fromBucketName(this, "hot-reload", "hot-reload"),
          `${__dirname}/../../backend/dist/${id}`
        )
      : lambda.Code.fromAsset(`../backend/dist/${id}`);

    this.handler = new lambda.Function(this, "handler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "app.handler",
      code: codeConfig,
      environment: {
        NOTES_TABLE_NAME: table.tableName,
      },
    });

    // grant the lambda role read/write permissions to notes table
    table.grant(this.handler, ...grantActions);
  }
}
