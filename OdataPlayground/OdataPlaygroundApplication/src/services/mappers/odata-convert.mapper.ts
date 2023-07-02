import { OdataDebugScheme } from "../../types/odata-debug-scheme";
import { OdataDebugGroup } from "../../models/odata-debug-group.model";
import { OdataDebugGroups } from "../../types/odata-debug-groups";
import {
  TextfieldFilter,
  TextfieldFilters,
} from "../../types/textfield-filter.type";
import { HttpMethod } from "../../enums/httpMethod.enum";

const selector = /https*:\/\/[A-Za-z]*:*\d{1,4}\/$/;

export class OdataConvertMapper {
  public static mapOdataDebugSchemeToOdataDebugGroups(
    scheme?: OdataDebugScheme | null
  ): OdataDebugGroups {
    let groups: Record<string, OdataDebugGroup> = {};

    if (!scheme) return [];

    for (const entry of scheme) {
      const dn = entry.DisplayName.match(/\w+\.\w+/gm)?.[1] ?? "";
      const dnTitle =
        entry.DisplayName.match(/\w+Controller/gm)?.[0]?.replace(
          "Controller",
          ""
        ) ?? "";

      if (groups[dnTitle])
        groups[dnTitle].values.push({ ...entry, DisplayName: dn });
      else
        groups = Object.assign(groups, {
          [dnTitle]: {
            name: dnTitle,
            values: [{ ...entry, DisplayName: dn }],
          },
        });
    }

    return Object.values(groups) as OdataDebugGroups;
  }

  public static mapOdataDebugSchemeToTextfieldFilter(
    ds?: OdataDebugScheme | null
  ): TextfieldFilters {
    return (
      ds?.map((value) => {
        const v = value.DisplayName.match(/\w+\.\w+/gm)?.[1];

        return {
          selector,
          key: value.Pattern,
          value: v,
          httpMethod: value.HttpMethods?.[0] as HttpMethod,
        } as TextfieldFilter;
      }) ?? []
    );
  }
}
