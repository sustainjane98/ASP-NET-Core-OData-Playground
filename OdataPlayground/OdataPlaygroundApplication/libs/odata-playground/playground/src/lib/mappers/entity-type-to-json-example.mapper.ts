import {
  OdataEntityDefinitionsProviderContextDefinition,
  OdataEntityDefinitionsProviderContextDefinitionPair,
} from '../types/odata-entity-definitions-provider-context-definition.type';
import {
  ExampleValues,
  isPrimitiveEntityTypes,
  OdataPrimitiveEntityTypesUnion,
} from '@odata-playground/odata';
import { turnIntoArrayIfRequired } from '../helpers/turn-into-array-if-required.helper';

export const mapEntityTypeToJsonExample = (
  entityDefinition: OdataEntityDefinitionsProviderContextDefinition
) => {
  let exampleJSON: Record<string, object | string> = {};

  const entityDefinitionValues = Object.values(entityDefinition);

  for (const entityDefinitionValuesValue of entityDefinitionValues) {
    exampleJSON = Object.assign(
      exampleJSON,
      mapSingleEntityTypeToJsonExample(entityDefinitionValuesValue)
    );
  }

  return exampleJSON;
};

export const mapSingleEntityTypeToJsonExample = (
  childDefs:
    | OdataEntityDefinitionsProviderContextDefinitionPair
    | OdataEntityDefinitionsProviderContextDefinitionPair[]
) => {
  let exampleJSON: Record<string, object | string> = {};

  if (Array.isArray(childDefs)) {
    for (const childDefsValue of childDefs) {
      if (isPrimitiveEntityTypes(childDefsValue.value)) {
        exampleJSON = Object.assign(exampleJSON, {
          [childDefsValue.key]: turnIntoArrayIfRequired(
            ExampleValues[
              childDefsValue.value as OdataPrimitiveEntityTypesUnion
            ],
            childDefsValue.isArray
          ),
        });
      } else {
        exampleJSON = Object.assign(exampleJSON, {
          [childDefsValue.key]: turnIntoArrayIfRequired(
            mapSingleEntityTypeToJsonExample(childDefsValue.value),
            childDefsValue.isArray
          ),
        });
      }
    }
  } else {
    if (isPrimitiveEntityTypes(childDefs.value)) {
      exampleJSON = Object.assign(exampleJSON, {
        [childDefs.key]: turnIntoArrayIfRequired(
          ExampleValues[childDefs.value as OdataPrimitiveEntityTypesUnion],
          childDefs.isArray
        ),
      });
    } else {
      exampleJSON = Object.assign(exampleJSON, {
        [childDefs.key]: turnIntoArrayIfRequired(
          mapSingleEntityTypeToJsonExample(childDefs.value),
          childDefs.isArray
        ),
      });
    }
  }

  return exampleJSON;
};
