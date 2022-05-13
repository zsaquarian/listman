import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import ListHeader from './substituteComponents/ListHeaderSub.svelte';
import { LIST_SCHEMA_VERSION_NO } from '@utils/constants';
import { DateTime } from 'luxon';
import * as listUtils from '@utils/listUtils';
import { Share } from '@capacitor/share';

const props = {
  list: {
    version: LIST_SCHEMA_VERSION_NO,
    name: 'test list name',
    isShared: false,
    items: [],
    modified: '20000101T000000Z',
  },
  isMasterList: false,
  isShared: false,
  selected: [],
  listUuid: 'test-uuid',
};

describe('List Header', () => {
  it('should render', () => {
    const rendered = render(ListHeader, props);

    expect(rendered).toBeTruthy();
  });

  it('should show the name of the list', () => {
    const rendered = render(ListHeader, props);

    expect(rendered.findByText('test list name')).toBeTruthy();
  });

  it('should show the share and collabarate button', () => {
    const rendered = render(ListHeader, props);

    expect(rendered.findByText('Share')).toBeTruthy();
    expect(rendered.findByText('Collabarate')).toBeTruthy();
  });

  it('should show the master list text and create new list button', () => {
    const rendered = render(ListHeader, { ...props, isMasterList: true });

    expect(rendered.findByText('Master List')).toBeTruthy();
    expect(rendered.findByText('Create new list')).toBeTruthy();
  });

  it('should make a new list', async () => {
    const rendered = render(ListHeader, {
      ...props,
      isMasterList: true,
      selected: [{ item: 'this item is selected', done: false }],
    });
    const createListSpy = vi.spyOn(listUtils, 'createList');

    await fireEvent.click(rendered.getByText('Create new list'));

    expect(createListSpy).toHaveBeenCalled();
  });
});
