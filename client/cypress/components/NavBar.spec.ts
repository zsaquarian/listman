import { mount } from 'cypress-svelte-unit-test';
import NavBar from '@/NavBar.svelte';

beforeEach(() => {
  mount(NavBar);
});

it('should show all the links', () => {
  cy.contains('a', 'Home').and('have.attr', 'href', '/');
  cy.contains('a', 'Master list').and('have.attr', 'href', '/master');
});
