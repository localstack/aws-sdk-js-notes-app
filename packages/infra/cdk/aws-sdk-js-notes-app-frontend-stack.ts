import {
  Stack,
  StackProps,
  CfnOutput,
  aws_s3 as s3,
  aws_s3_deployment,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class AwsSdkJsNotesAppFrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      bucketName: "notes-app-frontend",
    });

    new aws_s3_deployment.BucketDeployment(this, "DeployWebsite", {
      sources: [aws_s3_deployment.Source.asset("../frontend/dist")],
      destinationBucket: websiteBucket,
    });

    new cloudfront.Distribution(this, "WebsiteDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
      },
    });

    new CfnOutput(this, "FrontendBucketWebsite", {
      value: `http://${websiteBucket.bucketName}.s3-website.localhost.localstack.cloud:4566/`,
    });
  }
}
