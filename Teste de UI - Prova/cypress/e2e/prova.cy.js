describe('Testes de Login', () => {
  it('Deve logar com sucesso', () => {
    fazerLogin('standard_user', 'secret_sauce');

    cy.get('[data-test="secondary-header"]').contains('Products').should('be.visible');
  });

  it('Deve falhar ao logar com senha incorreta', () => {
    fazerLogin('standard_user', 'senha_errada');
    
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Deve falhar ao logar com usuário incorreto', () => {
    fazerLogin('usuario_errado', 'secret_sauce');
    
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Deve adicionar um produto ao carrinho', () => {
    fazerLogin('standard_user', 'secret_sauce');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').contains('Remove').should('be.visible');
  });
});

function fazerLogin(username, password) {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
}
