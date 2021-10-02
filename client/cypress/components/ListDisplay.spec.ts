import { mount } from 'cypress-svelte-unit-test';
import ListDisplay from '@/ListDisplay.svelte';

beforeEach(() => {
  mount(ListDisplay, {
    props: {
      list: { version: '1.0', name: 'Test shopping list', items: [{ item: 'test item', checked: false }] },
      removeItem: (i: number) => console.log(`remove item was called with ${i}`),
    },
  });
});

it('displays the title correctly', () => {
  cy.get('input').eq(0).should('have.value', 'Test shopping list');
});

it('should show the test item', () => {
  cy.contains('p', 'test item').should('exist');
});

it('should call the remove item function', () => {
  cy.spy(console, 'log').as('log');
  cy.contains('button', 'X').click();
  cy.get('@log').should('have.been.calledOnceWith', 'remove item was called with 0');
});

it('should be able to add items', () => {
  cy.get('input').eq(2).type('new test item');
  cy.contains('Add item').click();
  cy.get('p').should('have.length', 2);
});
