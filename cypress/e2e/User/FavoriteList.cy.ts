/// <reference types="cypress" />

describe('Quản lý danh sách yêu thích', () => {
  beforeEach(() => {
    cy.loginAsAdmin(); // custom command cho user thường
    cy.visit('/favorites');
  });

  it('Hiển thị danh sách My Favorites', () => {
    cy.contains('h2', 'My Favorites').should('be.visible');

    cy.contains('My Favorites')
      .parent() // div container chính
      .find('h3')
      .should('have.length.greaterThan', 0) // có ít nhất 1 phim yêu thích
      .each(($title) => {
        cy.wrap($title).should('not.be.empty');
      });

    cy.contains('My Favorites')
      .parent()
      .find('button')
      .contains('Xem chi tiết')
      .should('exist');
  });

  it('Click Xem chi tiết để mở phim yêu thích', () => {
    cy.contains('My Favorites')
      .parent()
      .find('button')
      .contains('Xem chi tiết')
      .first()
      .click({ force: true });
    
    // check điều hướng sang trang chi tiết phim
    cy.url().should('include', '/preview'); 
  });

});
