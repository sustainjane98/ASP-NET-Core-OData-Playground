import { OdataMetadataSchemeMapper } from "../services/mappers/odata-metadata-scheme.mapper";
import { OdataMetadataScheme } from "../types/odata-metadata-scheme.type";
import { useUpdateEffect } from "usehooks-ts";
import { OdataRequestForm } from "../components/index/odata-playground";
import { UseFormReturn, useWatch } from "react-hook-form";
import { HttpMethod } from "../enums/http-method.enum";

export const useRequestArea = (
  methods: UseFormReturn<OdataRequestForm, any, undefined>,
  metadata?: OdataMetadataScheme
) => {
  const httpMethod = useWatch({ control: methods.control, name: "httpMethod" });

  useUpdateEffect(() => {
    if (metadata && httpMethod !== HttpMethod.GET) {
      const entity =
        OdataMetadataSchemeMapper.mapSchemeToEntityTypes(metadata) ?? [];

      methods.setValue(
        "requestArea",
        JSON.stringify(
          OdataMetadataSchemeMapper.mapEntityTypeToJsonExample(entity[0])
        )
      );
      return;
    }
    methods.setValue("requestArea", "");
  }, [httpMethod, methods, metadata]);
};
