import { Storage } from '@capacitor/storage';
import { LIST_SCHEMA_VERSION_NO } from './constants';

export interface ShoppingListItem {
  item: string;
  done: boolean;
}

export interface ShoppingList {
  version: string;
  name: string;
  isShared: boolean;
  items: ShoppingListItem[];
}

export type Lists = {
  key: string;
  name: string;
  isShared: boolean;
  isExternal: boolean;
}[];

export const storeList = async (key: string, list: ShoppingList): Promise<void> => {
  const value = JSON.stringify(list);
  await Storage.set({ key, value });
};

export const loadList = async (key: string): Promise<ShoppingList> => {
  const { value: val } = await Storage.get({ key });
  console.log(val);
  if (val !== null && val) {
    return JSON.parse(val) as ShoppingList;
  } else {
    throw new Error('List does not exist');
  }
};

export const createList = (vals: ShoppingListItem[] = []): ShoppingList => {
  return { version: LIST_SCHEMA_VERSION_NO, items: vals, name: '', isShared: false };
};

export const addItem = async (list: ShoppingList, newVal: string): Promise<ShoppingList> => {
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
    const { name, isShared } = await loadList(key);

    names.push({ name, key, isShared, isExternal: false });
  }

  return names;
};

export const listToString = (list: ShoppingList) => {
  let ret = `${list.name} list is being shared with you from Listman app
 `;
  list.items.forEach((val) => {
    ret += `${val.done ? '[x]' : '[ ]'} ${val.item}
`;
  });
  return ret;
};
