import { render, RenderResult } from '@testing-library/svelte';
import IconButton from './IconButton.svelte';
import { AcademicCap } from 'svelte-hero-icons';
import userEvent from '@testing-library/user-event';

const onClickHandler = jest.fn();
let rendered: RenderResult;

describe('Icon Button', () => {
  beforeEach(() => {
    rendered = render(IconButton, { props: { text: 'test text', icon: AcademicCap, onClickHandler } });
  });

  it('should show the correct text', () => {
    expect(() => rendered.getByText('test text')).not.toThrow();
  });

  it('should call the handler', () => {
    expect(onClickHandler).toHaveBeenCalledTimes(0);

    userEvent.click(rendered.getByRole('button'));

    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
});
