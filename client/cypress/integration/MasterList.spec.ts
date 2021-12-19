define('Master List', () => {
  before(() => {
    cy.visit('/');
  });
  it('should be navigable from home screen', () => {
    cy.get('button').eq(0).click(); // opens the navbar
    cy.get('a').contains('Master list').click();
  });
  it('should be empty by default', () => {
    cy.contains('Try adding some items').should('have.lengthOf', 1);
  });
  it('should be able to add items', () => {
    cy.get('input').eq(-1).type('this is test item');
    cy.get('button').contains('Add item').click();
    cy.get('input').eq(-1).type('this is test item 2');
    cy.get('button').contains('Add item').click();
    cy.get('.mx-auto > div.w-full').children().should('have.lengthOf', 3); // 2 list items + header
  });
  it('should be able to remove items', () => {
    cy.get('div.w-full > :nth-child(2) > .flex').click();
    cy.get('.mx-auto > div.w-full').children().should('have.lengthOf', 2); // 1 list item + header
  });
  it('should be able to create a new list', () => {
    cy.get('.\\$m-2 > .mr-2').click();
    cy.contains('Create new list').click();
    cy.contains('this is test item 2').should('have.lengthOf', 1);
  });
});
