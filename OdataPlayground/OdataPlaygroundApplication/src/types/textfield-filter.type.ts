export type TextfieldFilter = {
  selector: RegExp;
  key: string;
  value?: string;
};

export type TextfieldFilters = TextfieldFilter[];
