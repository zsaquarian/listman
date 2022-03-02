import { describe, it, vi, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import { readable } from 'svelte/store';
import Form from '@components/Form.svelte';

vi.mock('@roxi/routify', () => ({ goto: readable(() => {}) }));
vi.mock('@urql/svelte');

const submitHandler = vi.fn();
const props = {
  errors: [],
  submitHandler,
  submitText: 'test submit text',
  formVals: {
    usernameOrEmail: 'username or email test',
    username: 'username',
    email: 'email',
    password: 'password',
  },
};

describe('Form', () => {
  it('should render', () => {
    const rendered = render(Form, props);

    expect(rendered).toBeTruthy();
  });

  describe("inputs should show when they're set", () => {
    it("shouldn't show inputs when their unset", () => {
      const rendered = render(Form, props);

      expect(() => rendered.getByRole('textbox')).toThrow();
      expect(() => rendered.getByText('Sign in with Google')).toThrow();
    });

    it('should always show password', () => {
      const rendered = render(Form, props);

      expect(() => rendered.getByLabelText('Password')).not.toThrow();
    });

    it('should show e-mail', () => {
      const rendered = render(Form, { ...props, hasEmail: true });

      expect(() => rendered.getByLabelText('E-mail')).not.toThrow();
    });

    it('should show username', () => {
      const rendered = render(Form, { ...props, hasUsername: true });

      expect(() => rendered.getByLabelText('Username')).not.toThrow();
    });

    it('should show usernameOrEmail', () => {
      const rendered = render(Form, { ...props, hasUsernameOrEmail: true });

      expect(() => rendered.getByLabelText('Username or e-mail')).not.toThrow();
    });

    it('should show google auth', () => {
      const rendered = render(Form, { ...props, hasGoogleAuth: true });

      expect(() => rendered.getByText('Sign in with Google')).not.toThrow();
    });
  });

  it('should show submitText', () => {
    const rendered = render(Form, props);

    expect(() => rendered.getByText('test submit text')).not.toThrow();
  });

  it('should trigger submitHandler', async () => {
    const rendered = render(Form, props);

    expect(submitHandler).toHaveBeenCalledTimes(0);

    await fireEvent.click(rendered.getByText('test submit text'));

    expect(submitHandler).toHaveBeenCalledTimes(1);
  });
});
