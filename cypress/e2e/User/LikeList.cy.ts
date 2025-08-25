/// <reference types="cypress" />

describe('Quản lý tập đã thích', () => {
  beforeEach(() => {
    cy.loginAsAdmin(); // custom command cho user
    cy.visit('/like');
  });

  it('Hiển thị danh sách Tập đã thích', () => {
    cy.contains('h2', 'Tập đã thích').should('be.visible');

    cy.contains('Tập đã thích')
      .parent()
      .find('h3')
      .should('have.length.greaterThan', 0) // có ít nhất 1 tập
      .each(($title) => {
        cy.wrap($title).should('not.be.empty');
      });

    cy.contains('Tập đã thích')
      .parent()
      .find('button')
      .contains('Xem')
      .should('exist');
  });

  it('Click Xem để mở tập phim yêu thích', () => {
    cy.contains('Tập đã thích')
      .parent()
      .find('button')
      .contains('Xem')
      .first()
      .click({ force: true });

    // Kiểm tra đã chuyển sang trang xem phim
    cy.url().should('include', '/watch'); 
  });
});
