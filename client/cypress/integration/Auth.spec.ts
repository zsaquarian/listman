describe('User creation and login', () => {
  before(() => {
    cy.request('POST', 'http://localhost:3000/seed');
    cy.visit('/');
  });

  beforeEach(() => {
    cy.clearCookies();
  });

  it('should be able to sign up', () => {
    cy.get('.mr-2 > a').click();
    cy.get('p.text-center > .transition').click();

    cy.get('[placeholder="E-mail"][value=""] > .border-2').type('test@test.com');
    cy.get('[placeholder="Username"][value=""] > .border-2').type('test user');
    cy.get('[placeholder="Password"][value=""] > .border-2').type('VeryGoodTe$tPassword123456');
    cy.get('.bg-accent-400').click();

    cy.intercept('http://localhost:3000/graphql').as('graphql');

    cy.wait('@graphql');

    cy.getCookie('refresh').should('exist');
    cy.getCookie('token').should('exist');
  });

  it('should be able to login and logout', () => {
    cy.get('.mr-2 > a').click();

    cy.get('[placeholder="Username or e-mail"][value=""] > .border-2').type('test user');
    cy.get('[placeholder="Password"][value=""] > .border-2').type('VeryGoodTe$tPassword123456');
    cy.get('.bg-accent-400').click();

    cy.intercept('http://localhost:3000/graphql').as('graphql');

    cy.wait('@graphql');

    cy.getCookie('refresh').should('exist');
    cy.getCookie('token').should('exist');

    cy.get('.w-6').click();
    cy.get('.rounded-md .bg-primary-200 > button').click();

    cy.getCookie('refresh').should('not.exist');
    cy.getCookie('token').should('not.exist');
  });
});
