import {
  EntityType,
  OdataMetadataScheme,
} from "../../types/odata-metadata-scheme.type";

export class OdataMetadataSchemeMapper {
  public static mapSchemeToEntityTypes(
    scheme: OdataMetadataScheme
  ): EntityType[] | undefined {
    return scheme["edmx:Edmx"]["edmx:DataServices"].Schema.find(
      ({ "@Namespace": ns }) => ns.includes("Models")
    )?.EntityType;
  }

  public static mapEntityTypeToJsonExample(et: EntityType) {
    let exampleJson = {};
    const properties = et.Property;

    for (const prop of properties) {
      exampleJson = Object.assign(exampleJson, { [prop["@Name"]]: "" });
    }

    return exampleJson;
  }
}
