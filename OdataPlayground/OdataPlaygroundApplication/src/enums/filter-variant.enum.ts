import { TextfieldProps as TextFieldProps } from "../components/textfield";

export const FilterVariant: Record<
  string,
  Omit<TextFieldProps["autoComplete"], "selector">
> = {
  FILTER: { key: "?filter=", value: "wfewefwfwf" },
  SELECT: "select",
  STOP: "stop",
  SKIP: "skip",
  COUNT: "count",
  EXPAND: "expand",
  SEARCH: "search",
  ORDER_BY: "orderby",
};
