import hash from 'object-hash';

export const DataTestidsIndex = {
  SEND_BUTTON: '2c6e603e-9158-44ea-ae60-3e915864eae6',
  CANCEL_BUTTON: '41b10b70-a9ce-4925-81f6-e0326a2d10b5',
  DROPDOWN_HTTP_METHOD: 'f8b64ae5-6dda-4080-a399-229526f79192',
  ODATA_ENDPOINT_SECTION_LINK_ICON_BUTTON:
    'd35dcba2-0117-4485-a9c7-89897c403830',
  ODATA_ENDPOINT_SECTION: '061ee097-b881-4bf2-8e45-c09feb6f37ce',
  ODATA_ENDPOINT_SECTION_URL: (url: string, httpMethod: string) =>
    hash({ url, httpMethod }),
};

export type DataTestidsIndex = typeof DataTestidsIndex;
