import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export const useBaseUrl = <T extends FieldValues = FieldValues>(
  methods: UseFormReturn<T>
) =>
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const odataPath = urlParams.get("odataPath");

    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    methods.setValue("baseUrl", odataPath ?? location.origin, {
      shouldDirty: true,
    });

    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    methods.setValue("url", odataPath ?? location.origin, {
      shouldDirty: true,
    });
  }, [methods]);
