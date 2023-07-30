export const useJSONFormat = () => (jsonObject: object) =>
  JSON.stringify(jsonObject, null, 2);
