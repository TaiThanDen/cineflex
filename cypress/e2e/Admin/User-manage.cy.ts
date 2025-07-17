/// <reference types="cypress" />

describe('Admin - Quản lý người dùng', () => {
  beforeEach(() => {
    cy.visit('/admin/users');
  });

  it('Hiển thị tiêu đề và danh sách người dùng', () => {
    cy.contains('Quản lý người dùng').should('be.visible');
    cy.get('.shadow.p-4').should('have.length.greaterThan', 0);
  });

  it('Tìm kiếm người dùng hoạt động đúng', () => {
    cy.get('input[placeholder="Tìm người dùng..."]').clear().type('Tuấn');

    // Thêm chờ debounce hoặc sự kiện cập nhật UI (nếu có)
    cy.wait(300);

    cy.get('.shadow.p-4').each(($el) => {
      cy.wrap($el).should('contain.text', 'Tuấn');
    });
  });

  it('Hiển thị modal khi nhấn vào một người dùng', () => {
    cy.get('.shadow.p-4').first().click();

    cy.get('.fixed.inset-0 .bg-white').should('be.visible');

    // Fix lỗi within do nhiều div.bg-white
    cy.get('.fixed.inset-0 .bg-white').first().within(() => {
      cy.contains('Email:').should('exist');
      cy.contains('SĐT:').should('exist');
    });
  });

  it('Đóng modal khi click bên ngoài', () => {
    cy.get('.shadow.p-4').first().click();

    cy.get('.fixed.inset-0 .bg-white').should('be.visible');

    // Click overlay với force do có thể bị che
    cy.get('.bg-black\\/30').click('topLeft', { force: true });

    cy.get('.fixed.inset-0 .bg-white').should('not.exist');
  });

  it('Hiển thị nút Sửa và Xóa khi mở modal', () => {
    cy.get('.shadow.p-4').first().click();

    cy.get('.fixed.inset-0 .bg-white').first().within(() => {
      cy.contains('Sửa').should('be.visible');
      cy.contains('Xóa').should('be.visible');
    });
  });

  it('Thêm người dùng mới khi nhấn nút', () => {
    cy.get('.shadow.p-4').then((cardsBefore) => {
      const countBefore = cardsBefore.length;

      cy.contains('+ Thêm người dùng').click();

      cy.get('.shadow.p-4').should('have.length.greaterThan', countBefore);
    });
  });
});
