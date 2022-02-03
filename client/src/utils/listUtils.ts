import { Storage } from '@capacitor/storage';
import { IGNORED_KEYS, LIST_SCHEMA_VERSION_NO } from './constants';
import { DateTime } from 'luxon';
import { migrateList } from './versionUtils';

export interface GenericListItem {
  item: string;
  done: boolean;
}

export interface GenericList {
  version: string;
  name: string;
  isShared: boolean;
  items: GenericListItem[];
  modified: string;
}

export type Lists = {
  key: string;
  name: string;
  isShared: boolean;
  isExternal: boolean;
}[];

export const storeList = async (key: string, list: GenericList): Promise<void> => {
  list.modified = DateTime.now().toISO();

  const value = JSON.stringify(list);
  await Storage.set({ key, value });
};

export const loadList = async (key: string): Promise<GenericList> => {
  const { value: val } = await Storage.get({ key });
  if (val !== null && val) {
    let list = JSON.parse(val) as GenericList;

    list = migrateList(list);

    return list;
  } else {
    throw new Error('List does not exist');
  }
};

export const loadOrCreateList = async (key: string): Promise<GenericList> => {
  try {
    const loadedList = await loadList(key);
    return loadedList;
  } catch (e) {
    return createList();
  }
};

export const createList = (vals: GenericListItem[] = []): GenericList => {
  return { version: LIST_SCHEMA_VERSION_NO, items: vals, name: '', isShared: false, modified: DateTime.now() };
};

export const addItem = async (list: GenericList, newVal: string): Promise<GenericList> => {
  if (!list.version) {
    list = createList();
  }

  list.items.push({ item: newVal, done: false });

  return list;
};

export const getLists = async (): Promise<Lists> => {
  const { keys } = await Storage.keys();
  const names: Lists = [];

  for (const key of keys) {
    if (IGNORED_KEYS.includes(key)) continue;

    const { name, isShared } = await loadList(key);

    names.push({ name, key, isShared, isExternal: false });
  }

  return names;
};

export const listToString = (list: GenericList): string => {
  let ret = `${list.name} list is being shared with you from Listman app
 `;
  list.items.forEach((val) => {
    ret += `${val.done ? '[x]' : '[ ]'} ${val.item}
`;
  });
  return ret;
};

export const getFormattedModifiedTime = (list: GenericList): string => {
  const modifiedTime = DateTime.fromISO(list.modified);

  console.log(list.modified);

  const ago = modifiedTime.diffNow();
  // -1 is there as luxon does `now - modified`, but we want `modified - now`
  const minutesAgo = -1 * ago.as('minutes');

  if (minutesAgo < 1) {
    return 'a few seconds ago';
  }

  if (minutesAgo < 60) {
    return `${minutesAgo.toFixed(0)} minutes ago`;
  }

  const hoursAgo = -1 * ago.as('hours');

  if (hoursAgo < 24) {
    return `${hoursAgo.toFixed(0)} hours ago`;
  }

  const daysAgo = -1 * ago.as('days');

  if (daysAgo < 7) {
    return `${daysAgo.toFixed(0)} days ago`;
  }

  return ago.toFormat('dd, MM yyyy');
};

export const isDifferent = (list1: GenericList, list2: GenericList): boolean => {
  const list1Copy = { ...list1, modified: undefined };
  const list2Copy = { ...list2, modified: undefined };

  console.log(JSON.stringify(list1Copy) !== JSON.stringify(list2Copy));

  return JSON.stringify(list1Copy) !== JSON.stringify(list2Copy);
};
