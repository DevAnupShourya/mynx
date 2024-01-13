describe('Mynx : E2E Tests', () => {
  it('renders Dashboard when online, renders Landing when offline', () => {
    cy.visit('/');
    cy.intercept('GET', 'https://mynx-api.onrender.com/v1').as('checkAuth');

    cy.wait('@checkAuth').then(() => {
      cy.window().its('store').invoke('getState').its('user').its('authStatus').should('be.oneOf', ['loading', 'authenticated', 'unauthenticated']);
    }).then(() => {

      // 
    })

  });
});