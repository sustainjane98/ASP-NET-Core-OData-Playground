import React, { PropsWithChildren, useState } from 'react';
import { OdataEntityDefinitionsProviderContextDefinition } from '../../types/odata-entity-definitions-provider-context-definition.type';

type InitialData = {
  [x: string]:
    | OdataEntityDefinitionsProviderContextDefinition
    | InitialDataFunctions['setOverride'];
};

type InitialDataFunctions = {
  setOverride: (
    name: string,
    value: OdataEntityDefinitionsProviderContextDefinition
  ) => void;
};

const initialData: InitialData = {};

const initialDataFunctions: InitialDataFunctions = {
  setOverride: () => {
    return;
  },
};

export const OdataEntityDefinitionsProviderContext = React.createContext<
  InitialData & InitialDataFunctions
>({ ...initialData, ...initialDataFunctions });

export const OdataEntityDefinitionsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<InitialData>(initialData);

  return (
    <OdataEntityDefinitionsProviderContext.Provider
      value={{
        ...state,
        setOverride: (name, value) => {
          setState((prev) => {
            return { ...prev, [name]: value };
          });
        },
      }}
    >
      {children}
    </OdataEntityDefinitionsProviderContext.Provider>
  );
};
