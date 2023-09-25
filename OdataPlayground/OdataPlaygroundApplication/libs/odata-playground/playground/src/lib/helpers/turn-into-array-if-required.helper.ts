export const turnIntoArrayIfRequired = (
  value: Record<string, object | string> | string | number | boolean,
  isArray: boolean
) => (isArray ? [value] : value);
