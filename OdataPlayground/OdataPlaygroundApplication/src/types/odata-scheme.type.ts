import { OdataSchemeEntry } from "./odata-scheme-entry.type";

export interface OdataScheme {
  "@odata.context": string;
  value: OdataSchemeEntry[];
}
