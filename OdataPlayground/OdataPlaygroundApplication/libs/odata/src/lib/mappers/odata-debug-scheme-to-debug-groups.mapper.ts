import { OdataDebugScheme } from '../types/odata-debug-scheme';
import { OdataDebugGroups } from '../types/odata-debug-groups';
import { OdataDebugGroup } from '../models/odata-debug-group.model';

export const mapOdataDebugSchemeToOdataDebugGroups = (
  scheme?: OdataDebugScheme | null
): OdataDebugGroups => {
  let groups: Record<string, OdataDebugGroup> = {};

  if (!scheme) return [];

  for (const entry of scheme) {
    const dn = entry.DisplayName.match(/\w+\.\w+/gm)?.[1] ?? '';
    const dnTitle =
      entry.DisplayName.match(/\w+Controller/gm)?.[0]?.replace(
        'Controller',
        ''
      ) ?? '';

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
};
