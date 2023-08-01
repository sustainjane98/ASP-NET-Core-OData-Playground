import hash from 'object-hash';

export const DataTestidsIndex = {
  SEND_BUTTON: '2c6e603e-9158-44ea-ae60-3e915864eae6',
  CANCEL_BUTTON: '41b10b70-a9ce-4925-81f6-e0326a2d10b5',
  DROPDOWN_HTTP_METHOD: (methodOrElement?: string) =>
    `f8b64ae5-6dda-4080-a399-229526f79192${
      methodOrElement ? `-${hash({ methodOrElement })}` : ''
    }`,
  ODATA_ENDPOINT_SECTION_LINK_ICON_BUTTON:
    'd35dcba2-0117-4485-a9c7-89897c403830',
  ODATA_ENDPOINT_SECTION: '061ee097-b881-4bf2-8e45-c09feb6f37ce',
  ODATA_ENDPOINT_SECTION_URL: (url: string, httpMethod: string) =>
    hash({ url, httpMethod }),
  URL_TEXTFIELD: '5f76e220-1866-4b73-b1c7-016bb637ce51',
  RESPONSE_AREA: '7d217e95-e2f4-4983-a515-8925d1a587ca',
  REQUEST_AREA: '2a431999-8f6d-45b3-b7fa-56d2d2d81c09',
  URL_TEXTFIELD_AUTOCOMPLETE_OPTION(key: string) {
    return `51a334b7-321c-4b96-a96a-a5cda9d33928-${hash({ key })}`;
  },
};

export type DataTestidsIndex = typeof DataTestidsIndex;
