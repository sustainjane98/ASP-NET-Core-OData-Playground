import { useQuery } from "react-query";
import { useOdataPath } from "./use-odata-path.hook";
import axios from "axios";
import { xml2js } from "xml-js";

export const useOdataMetadataScheme = () => {
  const odataPath = useOdataPath();
  return useQuery("odata-metadata-scheme", async () => {
    return xml2js(
      (await axios.get(odataPath ? `${odataPath}/$metadata` : "/$metadata"))
        .data
    );
  });
};
