import React, { PropsWithChildren, useState } from 'react';
import { OdataEntityDefinitionsProviderContextDefinition } from '../../types/odata-entity-definitions-provider-context-definition.type';

type InitialData = {
  server: OdataEntityDefinitionsProviderContextDefinition;
  override: OdataEntityDefinitionsProviderContextDefinition | null;
  both: OdataEntityDefinitionsProviderContextDefinition;
  isOverritten: boolean;
};

type InitialDataFunctions = {
  setServer: (
    func: (
      server: OdataEntityDefinitionsProviderContextDefinition
    ) => OdataEntityDefinitionsProviderContextDefinition
  ) => void;
  setOverride: (
    func: (
      override: OdataEntityDefinitionsProviderContextDefinition
    ) => OdataEntityDefinitionsProviderContextDefinition
  ) => void;
};

const initialData: InitialData = {
  server: {},
  override: null,
  both: {},
  isOverritten: false,
};

const initialDataFunctions: InitialDataFunctions = {
  setOverride: () => {
    return;
  },
  setServer: () => {
    return;
  },
};

export const OdataEntityDefinitionsProviderContext = React.createContext<
  InitialData & InitialDataFunctions
>({ ...initialData, ...initialDataFunctions });

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export const mergeDeep = <M extends object>(target: M, ...sources: M[]): M => {
  if (!sources.length) return target as M;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep((target as Record<string, any>)[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

export const OdataEntityDefinitionsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<InitialData>(initialData);

  return (
    <OdataEntityDefinitionsProviderContext.Provider
      value={{
        ...state,
        both: mergeDeep(state.server, state.override ?? {}),
        isOverritten:
          state.override !== null ||
          Object.values(state.override ?? {}).length > 0,
        setServer: (func) => {
          setState((prev) => ({ ...prev, server: func(state.server) }));
        },
        setOverride: (func) => {
          setState((prev) => ({
            ...prev,
            override: func(state?.override ?? {}),
          }));
        },
      }}
    >
      {children}
    </OdataEntityDefinitionsProviderContext.Provider>
  );
};
