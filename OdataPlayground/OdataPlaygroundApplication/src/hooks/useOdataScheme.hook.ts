import axios from "axios";
import { useQuery } from "react-query";
import { OdataDebugScheme } from "../types/odata-debug-scheme";

export const useOdataScheme = () =>
  useQuery("odata-scheme", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const odataPath = urlParams.get("odataPath");

    return (
      await axios.get<OdataDebugScheme | null>(
        odataPath ? `${odataPath}/$odata` : "/$odata"
      )
    ).data;
  });
