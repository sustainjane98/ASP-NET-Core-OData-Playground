import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { i18n } from '@odata-playground/odata/i18n/config';
import { I18nextProvider } from 'react-i18next';

const queryClient = new QueryClient();

export const Wrappers: React.FC<PropsWithChildren> = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-undef
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n} defaultNS={'common'}>
        {children}
      </I18nextProvider>
    </QueryClientProvider>
  );
};
