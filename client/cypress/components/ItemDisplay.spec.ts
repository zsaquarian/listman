import { mount } from 'cypress-svelte-unit-test';
import ItemDisplay from '@/ItemDisplay.svelte';

beforeEach(() => {
  mount(ItemDisplay, {
    props: {
      checked: false,
      shouldLineThrough: false,
      itemName: 'test item',
      removeItem: () => console.log('remove item called'),
    },
  });
});

it('displays the right text', () => {
  cy.contains('p', 'test item');
});

it('calls remove item when x is pressed', () => {
  cy.spy(console, 'log').as('log');
  cy.get('button').click();
  cy.get('@log').should('be.calledWith', 'remove item called');
});
