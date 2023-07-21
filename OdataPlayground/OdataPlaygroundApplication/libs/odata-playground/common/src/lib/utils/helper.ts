import { EntityType } from "../types/odata-metadata-scheme.type";

export const findEntityTypeInCollection = (
  collection: EntityType[],
  name: string
) => collection.find((e) => e["@Name"] === name);
