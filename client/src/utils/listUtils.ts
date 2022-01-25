import { Storage } from '@capacitor/storage';
import { LIST_SCHEMA_VERSION_NO } from './constants';

export interface GenericListItem {
  item: string;
  done: boolean;
}

export interface GenericList {
  version: string;
  name: string;
  isShared: boolean;
  items: ListItem[];
}

export type Lists = {
  key: string;
  name: string;
  isShared: boolean;
  isExternal: boolean;
}[];

export const storeList = async (key: string, list: GenericList): Promise<void> => {
  const value = JSON.stringify(list);
  await Storage.set({ key, value });
};

export const loadList = async (key: string): Promise<GenericList> => {
  const { value: val } = await Storage.get({ key });
  if (val !== null && val) {
    return JSON.parse(val) as GenericList;
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
  return { version: LIST_SCHEMA_VERSION_NO, items: vals, name: '', isShared: false };
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
