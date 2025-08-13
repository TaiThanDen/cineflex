/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Cannot read properties of null")) {
    return false;
  }
});

describe('Tìm kiếm phim - CineFlex', () => {
  beforeEach(() => {
    cy.visit('/home')

    cy.get("button")
        .contains("✕", { timeout: 3000 }) // chờ quảng cáo load
        .click({ multiple: true, force: true }) // đóng tất cả nếu có nhiều
        .should("not.exist");
  })

  it('Hiển thị ô tìm kiếm', () => {
    cy.get('input[placeholder="Search for what you want to watch"]').should('be.visible')
  })

  it('Tìm kiếm phim có kết quả', () => {
    cy.get('input[placeholder="Search for what you want to watch"]')
        .type('Dune: Part Two{enter}')

    cy.contains('Dune: Part Two', { timeout: 5000 }).should('exist')
  })

  it('Tìm kiếm phim không tồn tại', () => {
    cy.get('input[placeholder="Search for what you want to watch"]')
        .clear()
        .type('KhôngCóPhimNày123{enter}');

    // Đợi debounce search / fetch API
    cy.wait(1000);

    // Kiểm tra thông báo chính xác
    cy.contains('Không tìm thấy phim nào phù hợp.').should('be.visible');
  });
})
