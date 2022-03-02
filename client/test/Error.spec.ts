import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Error from '@components/Error.svelte';

vi.mock('@utils/errorParser', () => ({
  getReadableError: () => {
    return 'test error';
  },
}));

describe('Error component', () => {
  it('should render', () => {
    const rendered = render(Error);
    expect(rendered).toBeTruthy();
  });

  it('should not show if error is undefined', () => {
    const rendered = render(Error);

    expect(() => rendered.getByRole('paragraph')).toThrow();
  });

  it('should show the right error', () => {
    const rendered = render(Error, { error: { type: 'Unknown' } });

    expect(() => rendered.getByText('test error')).not.toThrow();
  });
});
