/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Cannot read properties of null")) {
    return false;
  }
});

describe('Trang chủ CineFlex', () => {
  beforeEach(() => {
    cy.visit('/home');

    cy.get("button")
        .contains("✕", { timeout: 5000 })
        .then(($btn) => {
          if ($btn.length > 0) {
            cy.wrap($btn).click({ multiple: true, force: true });
          }
        });
  });

  it('Hiển thị thanh tìm kiếm', () => {
    cy.get('input[placeholder="Search for what you want to watch"]').should('be.visible');
  });

  it('Hiển thị tiêu đề phim nổi bật', () => {
    cy.contains('Đặc Vụ Cánh Bướm - Butterfly').scrollIntoView().should('be.visible');
  });

  it('Hiển thị danh sách phim phổ biến', () => {
    cy.contains('Popular on CineFlex').scrollIntoView().should('be.visible');

    cy.contains('Đặc Vụ Cánh Bướm - Butterfly').should('exist');
    cy.contains('Smurf (Làng xì trum)').should('exist');
    cy.contains('Together (Dính lẹo)').should('exist');
    cy.contains('Lilo & Stitch').should('exist');
  });

it('Xem phim sau khi nhấn Xem ngay', () => {
  cy.get('button[aria-label="Xem ngay"]').first().click();

  cy.url().should('include', '/preview');

  cy.get('button[aria-label="Xem ngay"]').first().click({ force: true });

  cy.url({ timeout: 10000 }).should('include', '/watch');
});



it('Hiển thị chi tiết phim khi nhấn nút xem phim', () => {
  cy.get('button[aria-label="Xem ngay"]').first().click();
  cy.url().should('include', '/preview');
});

it.only('Tìm kiếm phim và hiển thị kết quả', () => {
  const searchTerm = 'Gachiakuta';

  cy.get('input[placeholder="Search for what you want to watch"]')
    .type(searchTerm)    
    .type('{enter}');    

  cy.contains(searchTerm, { timeout: 10000 }).should('be.visible');
});

});
