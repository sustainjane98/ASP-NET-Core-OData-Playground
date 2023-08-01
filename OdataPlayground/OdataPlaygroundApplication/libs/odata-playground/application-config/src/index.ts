const baseUrlParam = '?odataPath=http://localhost:5000';
const port = 3000;
const testingPort = 5050;
const serverBaseUrl = `http://localhost:${port}`;
const testingServerBaseUrl = `http://localhost:${testingPort}`;
export const ApplicationConfig = {
  URL: serverBaseUrl,
  TESTING_URL: testingServerBaseUrl,
  BASE_URL_PARAM: baseUrlParam,
  URL_WITH_PARAMS: serverBaseUrl + baseUrlParam,
  TESTING_URL_WITH_PARAMS: serverBaseUrl + baseUrlParam,
  PORT: port,
  TESTING_PORT: testingPort,
} as const;
