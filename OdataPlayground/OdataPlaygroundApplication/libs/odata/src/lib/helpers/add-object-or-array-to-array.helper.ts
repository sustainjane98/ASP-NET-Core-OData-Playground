export const addObjectOrArrayToArray = <T>(array: T[], value: T | T[]): T[] => {
  if (Array.isArray(value)) {
    array = array.concat(value);
  } else {
    array.push(value);
  }

  return array;
};
