import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import type { GenericList } from '@utils/listUtils';
import ListDisplay from './substituteComponents/ListDisplaySub.svelte';
import { LIST_SCHEMA_VERSION_NO } from '@utils/constants';
import { DateTime } from 'luxon';

const removeItemMock = vi.fn();

const testList = {
  name: 'test list',
  version: LIST_SCHEMA_VERSION_NO,
  isShared: false,
  modified: DateTime.now().toISO(),
  items: [{ item: 'test item', done: false }],
} as GenericList;
const props = { isMasterList: false, removeItem: removeItemMock, list: testList };

describe('List Display', () => {
  it('should render', () => {
    const rendered = render(ListDisplay, props);

    expect(rendered).toBeTruthy();
  });

  describe('do various things with items', () => {
    const rendered = render(ListDisplay, props);

    it('should be able to add items', async () => {
      expect(rendered.getAllByText('test item')).toHaveLength(1);

      await fireEvent.input(rendered.getByPlaceholderText('Enter the name of a new item'), {
        target: { value: 'test item' },
      });

      await fireEvent.click(rendered.getByText('Add item'));

      expect(rendered.getAllByText('test item')).toHaveLength(2);
    });

    it('should be able to remove items', async () => {
      await fireEvent.click(rendered.getAllByRole('button')[3]); // TODO: add `aria-name` to button so we dont have to do this

      expect(removeItemMock).toHaveBeenCalledOnce();
      expect(removeItemMock).toHaveBeenLastCalledWith(1);
    });
  });
});
