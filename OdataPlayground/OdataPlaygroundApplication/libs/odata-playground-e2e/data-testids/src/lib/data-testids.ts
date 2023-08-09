import { DataTestidsIndex } from './data-testids-index';
import { DataTestIdCommon } from './data-test-id-common';
import { DataTestIdOdataCommon } from './data-test-id-odata-common';
import { DataTestIdOdataError } from './data-test-id-odata-error';

export const DataTestids = {
  Index: DataTestidsIndex,
  COMMON: DataTestIdCommon,
  ODATA_COMMON: DataTestIdOdataCommon,
  ODATA_ERROR: DataTestIdOdataError,
};

export type DataTestids = typeof DataTestids;
