import { HttpMethod } from '@odata-playground/common';

export interface OdataRequestForm {
  baseUrl: string;
  url: string;
  requestArea: string;
  responseArea: string;
  httpMethod: HttpMethod;
}
