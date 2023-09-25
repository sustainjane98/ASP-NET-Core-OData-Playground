import { OdataPrimitiveEntityTypesUnion } from '@odata-playground/odata';

export interface OdataEntityDefinitionsProviderContextDefinition {
  [x: string]:
    | OdataEntityDefinitionsProviderContextDefinitionPair
    | OdataEntityDefinitionsProviderContextDefinitionPair[];
}

export interface OdataEntityDefinitionsProviderContextDefinitionPair {
  key: string;
  isArray: boolean;
  value:
    | OdataEntityDefinitionsProviderContextDefinitionPair
    | OdataEntityDefinitionsProviderContextDefinitionPair[]
    | OdataPrimitiveEntityTypesUnion;
}
