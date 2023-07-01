import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export const useReponseArea = <M, T extends FieldValues = FieldValues>(
  methods: UseFormReturn<T>,
  data: M,
  isSuccess: boolean
) =>
  useEffect(() => {
    if (data && isSuccess) {
      methods.setValue("responseArea" as any, JSON.stringify(data) as any);
    } else {
      methods.setValue("responseArea" as any, "Something went wrong" as any);
    }
  }, [methods, data, isSuccess]);
