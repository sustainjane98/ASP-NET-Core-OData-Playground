import { CommonElementPropsWithName } from './common-elements-props.type';

export type TextfieldFilter = {
  selector: RegExp;
  key: string;
  value?: string;
  [x: string]: any;
};

export type TextfieldFilters = TextfieldFilter[];

export type TextfieldFiltersWithCommon = (TextfieldFilter &
  CommonElementPropsWithName)[];
