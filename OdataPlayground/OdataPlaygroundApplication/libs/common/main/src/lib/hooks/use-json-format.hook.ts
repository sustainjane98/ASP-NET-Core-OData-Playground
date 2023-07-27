export const useJSONFormat = () => (jsonObject: Record<string, string>) =>
  JSON.stringify(jsonObject, null, 2);
