import { OdataMetadataScheme } from "../types/odata-metadata-scheme.type";
import { useUpdateEffect } from "usehooks-ts";
import { OdataRequestForm } from "../components/index/odata-playground";
import { UseFormReturn, useWatch } from "react-hook-form";
import { HttpMethod } from "../enums/http-method.enum";
import {
  mapEntityTypeToJsonExample,
  mapSchemeToEntityTypes,
} from "../utils/mapper";
import { findEntityTypeInCollection } from "../utils/helper";
import { useCollectionName } from "./use-collection-name.hook";

export const useRequestArea = (
  methods: UseFormReturn<OdataRequestForm, any, undefined>,
  metadata?: OdataMetadataScheme
) => {
  const httpMethod = useWatch({ control: methods.control, name: "httpMethod" });

  const collName = useCollectionName(methods.control);

  useUpdateEffect(() => {
    if (metadata && httpMethod !== HttpMethod.GET) {
      const entity = mapSchemeToEntityTypes(metadata) ?? [];

      const et = findEntityTypeInCollection(entity, collName);

      if (!et) {
        methods.setValue("requestArea", "");
        return;
      }

      methods.setValue(
        "requestArea",
        JSON.stringify(mapEntityTypeToJsonExample(et))
      );
      return;
    }
    methods.setValue("requestArea", "");
  }, [httpMethod, methods, metadata, collName]);
};