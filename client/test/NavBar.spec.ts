import { beforeEach, describe, it, vi, expect } from 'vitest';
import { render, RenderResult, fireEvent } from '@testing-library/svelte';
import Empty from './substituteComponents/Empty.svelte';
import NavBar from '@components/NavBar.svelte';

vi.mock('@components/UserDropdown.svelte', () => ({ default: Empty }));

let rendered: RenderResult;

describe('NavBar', () => {
  beforeEach(() => {
    rendered = render(NavBar);
  });

  it('should render', () => {
    expect(rendered).toBeTruthy();
  });

  it('should have all the links', () => {
    expect(() => rendered.getByText('Home')).not.toThrow();
    expect(() => rendered.getByText('All Lists')).not.toThrow();
    expect(() => rendered.getByText('Master list')).not.toThrow();
    expect(() => rendered.getByText('Settings')).not.toThrow();
  });

  it('should have the right link hrefs', () => {
    expect(rendered.getByText('Home').getAttribute('href')).toBe('/');
    expect(rendered.getByText('All Lists').getAttribute('href')).toBe('/list');
    expect(rendered.getByText('Master list').getAttribute('href')).toBe('/master');
    expect(rendered.getByText('Settings').getAttribute('href')).toBe('/config');
  });

  it('should open and close', async () => {
    expect(() => rendered.getByRole('button', { name: 'Open navigation menu' })).not.toThrow();
    window.innerWidth = 1000;
    window.dispatchEvent(new Event('resize'));
    await fireEvent.click(rendered.getByRole('button', { name: 'Open navigation menu' }));
    expect(() => rendered.getByRole('button', { name: 'Close navigation menu' })).not.toThrow();
  });
});
