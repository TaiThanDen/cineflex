/// <reference types="cypress" />

// Bỏ qua lỗi từ app như "Cannot read properties of null"
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Cannot read properties of null")) {
    return false;
  }
});

describe('Trang chủ CineFlex', () => {
  beforeEach(() => {
    cy.visit('/home');

    // Đóng quảng cáo nếu có nút ✕
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
    cy.contains('Test').scrollIntoView().should('be.visible');
  });

  it('Hiển thị danh sách phim phổ biến', () => {
    cy.contains('Popular on CineFlex').scrollIntoView().should('be.visible');

    // Kiểm tra các phim đúng theo ảnh bạn cung cấp
    cy.contains('Lupin the 3rd').should('exist');
    cy.contains('Kimetsu no Yaiba').should('exist');
    cy.contains('Clevatess').should('exist');
    cy.contains('Dune: Part Two').should('exist');
  });

  it('Xem phim sau khi hiện quảng cáo', () => {
    cy.contains('Watch Now').click();

    // Nếu có phần "Quảng cáo", kiểm tra
    cy.contains('Quảng cáo', { timeout: 5000 }).should('exist');

    cy.contains('Xem phim', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .click({ force: true });

    cy.url().should('include', '/watch');
  });

  it('Hiển thị chi tiết phim khi nhấn More Info', () => {
    // Nhấn vào nút "More Info"
    cy.contains("More Info").click();
    cy.url().should('include', '/preview');

  });

});
