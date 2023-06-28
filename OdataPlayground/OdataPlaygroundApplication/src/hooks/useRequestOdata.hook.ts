import { useMutation } from "react-query";
import { HttpMethod } from "../enums/httpMethod.enum";
import axios from "axios";

export const useRequestOdata = () =>
  useMutation(async (val: { httpMethod: HttpMethod; url: string }) => {
    return (
      await axios<string>({ method: val.httpMethod as string, url: val.url })
    ).data;
  });
