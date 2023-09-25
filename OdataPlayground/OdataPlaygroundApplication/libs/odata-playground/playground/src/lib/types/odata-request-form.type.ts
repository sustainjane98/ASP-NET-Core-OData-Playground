import { HttpMethod } from '@odata-playground/common/enums';
import { IndexRequestAndReponseFormData } from '../enums/index-request-and-reponse-form-data.enum';

export interface OdataRequestForm {
  [IndexRequestAndReponseFormData.BASE_URL]: string;
  [IndexRequestAndReponseFormData.URL]: string;
  [IndexRequestAndReponseFormData.REQUEST_AREA]: string;
  [IndexRequestAndReponseFormData.RESPONSE_AREA]: string;
  [IndexRequestAndReponseFormData.HTTP_METHOD]: HttpMethod;
}
