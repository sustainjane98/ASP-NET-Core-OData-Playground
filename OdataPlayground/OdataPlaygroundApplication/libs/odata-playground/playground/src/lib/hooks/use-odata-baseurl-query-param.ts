let odataPathGlobal = '';

export const useOdataBasUrlQueryParam = (): string | undefined => {
  if (!odataPathGlobal) {
    const urlParams = new URLSearchParams(window.location.search);
    const odataPath = urlParams.get('odataPath');
    if (odataPath) odataPathGlobal = odataPath;
  }

  return odataPathGlobal;
};
