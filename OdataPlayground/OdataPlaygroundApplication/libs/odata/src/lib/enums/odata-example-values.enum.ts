import { OdataEntityTypes } from './odata-entity-types.enum';

export const ExampleValues: Record<string, number | boolean | string> = {
  [OdataEntityTypes.STRING]: '',
  [OdataEntityTypes.INT_32]: 100,
  [OdataEntityTypes.INT_64]: 100,
  [OdataEntityTypes.INT]: 100,
  [OdataEntityTypes.DECIMAL]: 20,
  [OdataEntityTypes.BOOLEAN]: false,
};

export const ExampleValuesKeys = Object.keys(ExampleValues);
