import { DataTestidsIndex } from './data-testids-index';
import { DataTestIdCommon } from './data-test-id-common';
import { DataTestIdOdataCommon } from './data-test-id-odata-common';

export const DataTestids = {
  Index: DataTestidsIndex,
  COMMON: DataTestIdCommon,
  ODATA_COMMON: DataTestIdOdataCommon,
};

export type DataTestids = typeof DataTestids;
