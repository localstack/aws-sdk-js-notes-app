const turnToPreviewUrl = (url: string) => {
  // Define a regular expression to match the required parts of the input URL
  const regex = /^https:\/\/([a-zA-Z0-9-]+)\.execute-api\.localhost\.localstack\.cloud:(\d+)\/([^\/]+)\/(.+)$/;

  // Use the regex to capture the relevant parts of the input URL
  const matches = url.match(regex);

  // Check if the URL matches the expected pattern
  if (matches && matches.length === 5) {
    const apiId = matches[1];
    const port = matches[2];
    const stage = matches[3];
    const path = matches[4];

    // Construct the transformed URL
    const transformedUrl = `http://${window.location.origin}/restapis/${apiId}/${stage}/_user_request_/${path}`;

    return transformedUrl;
  } else {
    // If the input URL doesn't match the expected pattern, return an error message
    return 'Invalid input URL';
  }
};

export const GATEWAY_URL = turnToPreviewUrl(import.meta.env.VITE_GATEWAY_URL);
export const  MAX_FILE_SIZE = 500000;
export const  FILES_BUCKET = import.meta.env.VITE_FILES_BUCKET;
export const REGION = import.meta.env.VITE_REGION;
export const IDENTITY_POOL_ID = import.meta.env.VITE_IDENTITY_POOL_ID;
export const  BASE_URL =  import.meta.env.BASE_URL;
