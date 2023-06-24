import axios from "axios";
import { useQuery } from "react-query";
import { OdataScheme } from "../types/odata-scheme.type";

export const useOdataScheme = () =>
  useQuery("odata-scheme", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const odataPath = urlParams.get("odataPath");

    return (await axios.get<OdataScheme>(odataPath ?? "/")).data;
  });
