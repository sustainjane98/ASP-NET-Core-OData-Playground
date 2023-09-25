import {
  EntityType,
  isPrimitiveOdataType,
  isPropertyResolved,
  mapEntityTypeToProperties,
  OdataPrimitiveEntityTypesUnion,
  Property,
  PropertyResolved,
  removeEntityTypePrefix,
} from '@odata-playground/odata';
import {
  OdataEntityDefinitionsProviderContextDefinition,
  OdataEntityDefinitionsProviderContextDefinitionPair,
} from '../types/odata-entity-definitions-provider-context-definition.type';
import { replaceCollection } from '../helpers/replace-collection.helper';
import { isCollection } from '../typeguards/is-collection.typeguard';

export const mapOdataEntityTypeToEntityDefinition = (
  et: EntityType
): OdataEntityDefinitionsProviderContextDefinition => {
  const properties = mapEntityTypeToProperties(et);
  let result: OdataEntityDefinitionsProviderContextDefinition = {};

  for (const property of properties) {
    const { key, isArray, value } =
      mapOdataPropertyToEntityDefinition(property);

    result = Object.assign(result, { [key]: { key, isArray, value } });
  }

  return result;
};

const mapOdataPropertyToEntityDefinition = (
  property: PropertyResolved | Property
): OdataEntityDefinitionsProviderContextDefinitionPair => {
  const type = removeEntityTypePrefix(property['@Type']);

  if (isPrimitiveOdataType(replaceCollection(type))) {
    return {
      key: property['@Name'],
      isArray: isCollection(type),
      value: type as OdataPrimitiveEntityTypesUnion,
    };
  }

  if (isPropertyResolved(property)) {
    if (Array.isArray(property.Property)) {
      return {
        key: property['@Name'],
        isArray: isCollection(type),
        value: property.Property.map((p) =>
          mapOdataPropertyToEntityDefinition(p)
        ),
      };
    }

    return {
      key: property['@Name'],
      isArray: isCollection(type),
      value: mapOdataPropertyToEntityDefinition(property.Property),
    };
  }

  throw new Error(`${property['@Name']} is an invalid property, please check`);
};
