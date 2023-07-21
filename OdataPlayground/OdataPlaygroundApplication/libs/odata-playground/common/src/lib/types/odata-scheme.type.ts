import { OdataSchemeEntry } from "./odata-scheme-entry.type";

export interface OdataScheme<T = OdataSchemeEntry> {
  "@odata.context": string;
  value: T[];
}
