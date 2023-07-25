import { HttpMethod } from '@odata-playground/common';
import { IndexRequestAndReponseFormData } from '@odata-playground/odata/index';

export interface OdataRequestForm {
  [IndexRequestAndReponseFormData.BASE_URL]: string;
  [IndexRequestAndReponseFormData.URL]: string;
  [IndexRequestAndReponseFormData.REQUEST_AREA]: string;
  [IndexRequestAndReponseFormData.RESPONSE_AREA]: string;
  [IndexRequestAndReponseFormData.HTTP_METHOD]: HttpMethod;
}
