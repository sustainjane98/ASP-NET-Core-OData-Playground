import {
  ExampleValues,
  ExampleValuesKeys,
} from '../enums/odata-example-values.enum';

export const isPrimitiveOdataType = (type: any): type is typeof ExampleValues =>
  typeof type === 'string' && ExampleValuesKeys.includes(type);
