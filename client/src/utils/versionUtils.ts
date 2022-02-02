import { DateTime } from 'luxon';
import { LIST_SCHEMA_VERSION_NO } from './constants';
import type { GenericList } from './listUtils';

export interface ListVersion {
  major: number;
  minor: number;
}

export const getVersion = (version: string): ListVersion => {
  const majorAndMinor = version.split('.');
  const major = parseInt(majorAndMinor[0]);
  const minor = parseInt(majorAndMinor[1]);

  return { major, minor };
};

export const CURRENT_VERSION_NO = getVersion(LIST_SCHEMA_VERSION_NO);

export const getListVersion = (list: GenericList): ListVersion => {
  return getVersion(list.version);
};

export const migrateList = (list: GenericList): GenericList => {
  const version = getListVersion(list);

  if (version.major == CURRENT_VERSION_NO.major) {
    list.version = LIST_SCHEMA_VERSION_NO; // update the minor version number, if needed

    if (!list.modified) {
      list.modified = DateTime.now();
    }

    return list;
  } else {
    // TODO: put in migration code for new major versions
  }

  return list;
};
