import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import { readable } from 'svelte/store';

afterEach(() => cleanup());

vi.mock('@roxi/routify', () => ({ goto: readable(() => {}) }));
vi.mock('@urql/svelte');
