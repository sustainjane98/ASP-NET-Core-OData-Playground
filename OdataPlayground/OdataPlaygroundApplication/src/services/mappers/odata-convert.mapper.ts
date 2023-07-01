import { OdataScheme } from "../../types/odata-scheme.type";
import { TextfieldFilters } from "../../types/textfield-filter.type";

const selector = /https*:\/\/[A-Za-z]*:*\d{1,4}\/$/;

export class OdataConvertMapper {
  public static mapOdataSchemeToFilters(scheme?: OdataScheme | null) {
    return (
      scheme?.value
        ?.map(
          ({ name, url }) =>
            [
              {
                selector,
                key: url,
                value: name,
              },
              {
                selector,
                key: `${url}($1)`,
                value: `${name}ById`,
              },
            ] as TextfieldFilters
        )
        .flat() ?? []
    );
  }
}
