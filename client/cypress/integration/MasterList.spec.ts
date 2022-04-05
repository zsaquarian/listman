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
  it('should be able to create a new list', () => {
    cy.get('.\\$m-2 > .mr-2').click();
    cy.contains('Create new list').click();
    cy.contains('this is test item 2').should('have.lengthOf', 1);
  });
});
