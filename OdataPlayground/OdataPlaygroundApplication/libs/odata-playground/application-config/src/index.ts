const serverBaseUrl = 'http://localhost:3000';
const baseUrlParam = '?odataPath=http://localhost:8080';
export const ApplicationConfig = {
  URL: serverBaseUrl,
  BASE_URL_PARAM: baseUrlParam,
  URL_WITH_PARAMS: serverBaseUrl + baseUrlParam,
} as const;
