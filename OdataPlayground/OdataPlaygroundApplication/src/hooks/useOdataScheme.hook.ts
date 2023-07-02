import axios from "axios";
import { useQuery } from "react-query";
import { OdataDebugScheme } from "../types/odata-debug-scheme";
import { useOdataPath } from "./use-odata-path.hook";

export const useOdataScheme = () => {
  const odataPath = useOdataPath();

  return useQuery("odata-scheme", async () => {
    return (
      await axios.get<OdataDebugScheme | null>(
        odataPath ? `${odataPath}/$odata` : "/$odata"
      )
    ).data;
  });
};
