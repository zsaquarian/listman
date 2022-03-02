import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, RenderResult } from '@testing-library/svelte';
import IconButton from '@components/IconButton.svelte';
import { AcademicCap } from '@steeze-ui/heroicons';

const onClickHandler = vi.fn();
let rendered: RenderResult;

describe('Icon Button', () => {
  beforeEach(() => {
    rendered = render(IconButton, { props: { text: 'test text', icon: AcademicCap, onClickHandler } });
  });

  it('should render', () => {
    expect(rendered).toBeTruthy();
  });

  it('should show the correct text', () => {
    expect(() => rendered.getByText('test text')).not.toThrow();
  });

  it('should call the handler', async () => {
    expect(onClickHandler).toHaveBeenCalledTimes(0);

    await fireEvent.click(rendered.getByRole('button'));

    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
});
