import { OdataEntityDefinitionsProvider } from '../provider/odata-entity-definitions.provider';
import { OdataPlayground } from '../odata-playground';

export const odataPlaygroundEntityTypesWrapper = (
  Element: typeof OdataPlayground
) => {
  return (props: Parameters<typeof OdataPlayground>[0]) => {
    return (
      <OdataEntityDefinitionsProvider>
        {<Element {...props} />}
      </OdataEntityDefinitionsProvider>
    );
  };
};
