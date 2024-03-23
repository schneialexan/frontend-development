describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Login', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://todo-app-front-end-dev.vercel.app');
    cy.get('#email').clear('fh');
    cy.get('#email').type('fhgr@fhgr');
    cy.get('#password').clear();
    cy.get('#password').type('FHGR');
    cy.get('.py-8 > :nth-child(1) > :nth-child(1) > :nth-child(3) > .font-medium').click();
    cy.get('.container').click();
    /* ==== End Cypress Studio ==== */
  });
})