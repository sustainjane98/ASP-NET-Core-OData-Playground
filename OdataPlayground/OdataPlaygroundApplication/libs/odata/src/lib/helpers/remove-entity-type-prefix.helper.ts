export const removeEntityTypePrefix = (type: string): string =>
  type?.replace('Edm.', '').toLowerCase();
