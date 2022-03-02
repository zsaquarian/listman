import { describe, it, expect } from 'vitest';
import Toggle from '@components/Toggle.svelte';
import { render } from '@testing-library/svelte';
import { Moon, Sun } from '@steeze-ui/heroicons';

const props = { toggled: false, label: 'test label' };

describe('Toggle', () => {
  it('should render', () => {
    const rendered = render(Toggle, props);

    expect(rendered).toBeTruthy();
  });

  it('should show the label', () => {
    const rendered = render(Toggle, props);

    expect(() => rendered.getByText('test label')).not.toThrow();
  });

  it('should work with the icons', () => {
    const rendered = render(Toggle, { ...props, checkedIcon: Moon, uncheckedIcon: Sun });
    expect(() => rendered.getByTestId('checked-icon')).not.toThrow();
    expect(() => rendered.getByTestId('unchecked-icon')).not.toThrow();
  });
});
