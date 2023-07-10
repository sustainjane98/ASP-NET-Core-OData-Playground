import { Control, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { OdataRequestForm } from "../components/index/odata-playground";

export const useCollectionName = (control?: Control<OdataRequestForm, any>) => {
  const url = useWatch({ control, name: "url" }) as string;
  const [collName, setCollName] = useState("");

  useEffect(() => {
    const cn = url.split("/")?.[3];

    setCollName(cn ?? "");
  }, [url]);

  return collName;
};
