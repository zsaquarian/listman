import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Input from '@components/Input.svelte';

const props = { type: 'text', placeholder: 'test placeholder', value: 'test value' };

describe('Input', () => {
  it('should render', () => {
    const rendered = render(Input, props);
    expect(rendered).toBeTruthy();
  });

  it('should work with the text type', async () => {
    const { getByLabelText } = render(Input, props);

    const input = getByLabelText(props.placeholder);
    expect(input).toHaveProperty('value', props.value);
    expect(input).toHaveProperty('type', props.type);
  });

  it('should work with the password type', async () => {
    const { getByLabelText } = render(Input, { ...props, type: 'password' });

    const input = getByLabelText(props.placeholder);
    expect(input).toHaveProperty('value', props.value);
    expect(input).toHaveProperty('type', 'password');
  });
});
