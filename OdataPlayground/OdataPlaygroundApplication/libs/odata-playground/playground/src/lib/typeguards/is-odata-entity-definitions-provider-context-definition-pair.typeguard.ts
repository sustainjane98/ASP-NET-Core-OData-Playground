import { OdataEntityDefinitionsProviderContextDefinitionPair } from '../types/odata-entity-definitions-provider-context-definition.type';
import { isPrimitiveEntityTypes } from '../../../../../odata/src/lib/typeguards/is-entity-types.typeguard';
import { OdataPrimitiveEntityTypesType } from '@odata-playground/odata';

export const isOdataEntityDefinitionsProviderContextDefinitionPair = (
  value: OdataEntityDefinitionsProviderContextDefinitionPair['value']
): value is OdataEntityDefinitionsProviderContextDefinitionPair =>
  !!value &&
  !Array.isArray(value) &&
  !!(value as OdataEntityDefinitionsProviderContextDefinitionPair)?.value &&
  !!(value as OdataEntityDefinitionsProviderContextDefinitionPair)?.key &&
  !isPrimitiveEntityTypes(value as OdataPrimitiveEntityTypesType);
