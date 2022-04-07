import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import ItemDisplay from '@components/ItemDisplay.svelte';

const removeItemMock = vi.fn();

const props = { checked: false, shouldLineThrough: false, itemName: 'test item', removeItem: removeItemMock };

describe('Item Display', () => {
  it('should render', () => {
    const rendered = render(ItemDisplay, props);

    expect(rendered).toBeTruthy();
  });

  it('should show the item name', () => {
    const rendered = render(ItemDisplay, props);

    expect(() => rendered.getByDisplayValue('test item')).not.toThrow();
  });

  it('should not have strike through when `shouldLineThrough` is false', async () => {
    const rendered = render(ItemDisplay, props);

    await fireEvent.click(rendered.getByRole('checkbox'));

    expect(rendered.getByDisplayValue('test item').classList.contains('line-through')).toBe(false);
  });

  it('should have strike through when `shouldLineThrough` is true', async () => {
    const rendered = render(ItemDisplay, { ...props, shouldLineThrough: true });

    await fireEvent.click(rendered.getByRole('checkbox'));

    expect(rendered.getByDisplayValue('test item').classList.contains('line-through')).toBe(true);
  });

  it('should call `removeItem`', async () => {
    const rendered = render(ItemDisplay, props);

    expect(removeItemMock).toHaveBeenCalledTimes(0);

    await fireEvent.click(rendered.getByRole('button'));

    expect(removeItemMock).toHaveBeenCalledTimes(1);
  });
});
