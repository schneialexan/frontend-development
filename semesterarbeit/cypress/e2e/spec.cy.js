describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('Login', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://todo-app-front-end-dev.vercel.app');
    cy.get('#email').clear();
    cy.get('#email').type('fhgr@fhgr');
    cy.get('#password').clear();
    cy.get('#password').type('FHGR');
    cy.get('.py-8 > :nth-child(1) > :nth-child(1) > :nth-child(3) > .font-medium').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Login&Logout', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://todo-app-front-end-dev.vercel.app');
    cy.get('#email').clear();
    cy.get('#email').type('fhgr@fhgr');
    cy.get('#password').clear();
    cy.get('#password').type('FHGR');
    cy.get('.py-8 > :nth-child(1) > :nth-child(1) > :nth-child(3) > .font-medium').click();
    cy.get('.md\\:justify-between > .flex > .px-4').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Create&Delete New List', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://todo-app-front-end-dev.vercel.app');
    cy.get('#email').clear();
    cy.get('#email').type('fhgr@fhgr');
    cy.get('#password').clear();
    cy.get('#password').type('FHGR');
    cy.get('.py-8 > :nth-child(1) > :nth-child(1) > :nth-child(3) > .font-medium').click();
    cy.get('.drawer-content > .btn').click();
    cy.window().then((window) => {
      cy.stub(window, 'prompt').returns('Test List');
    });
    cy.get('.menu > :nth-child(2) > .btn').click();
    cy.get('.drawer-content').should('contain', 'Test List');
    cy.get(':nth-child(4) > .flex > div > .text-red-600 > .i-heroicons-outline-trash').click();
    cy.get('.drawer-content').should('not.contain', 'Test List');
    /* ==== End Cypress Studio ==== */
  });
})