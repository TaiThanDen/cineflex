/// <reference types="cypress" />

describe('Admin - Quản lý người dùng', () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/admin/users');
  });

  it('Hiển thị tiêu đề và danh sách người dùng', () => {
    cy.contains('Quản lý người dùng').should('be.visible');
    cy.get('.shadow.p-4').should('have.length.greaterThan', 0);
  });

  it('Hiển thị modal khi nhấn vào người dùng', () => {
    cy.get('.shadow.p-4').eq(2).scrollIntoView().click();

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('Username').should('exist');
      cy.contains('Email').should('exist');
      cy.contains('Vai trò').should('exist');
      cy.contains('Trạng thái').should('exist');
    });
  });

  it('Đóng modal khi click nút Hủy', () => {
    cy.get('.shadow.p-4').eq(2).scrollIntoView().click();

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.contains('Hủy').click();
    });

    cy.get('[role="dialog"]').should('not.exist');
  });

  it('Hiển thị nút Cấm/Bỏ lệnh cấm và Lưu khi mở modal', () => {
    cy.get('.shadow.p-4').eq(2).scrollIntoView().click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains(/^Cấm$|^Bỏ lệnh cấm$/).should('exist');
      cy.contains('Lưu').should('exist');
      cy.contains('Hủy').should('exist');
    });
  });

  it('Cấm người dùng', () => {
    // Chọn user thứ 2 có trạng thái đang hoạt động
    cy.get('.shadow.p-4').eq(2).should('contain', 'Đang hoạt động').click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains(/^Cấm$/).click();
      cy.contains('Lưu').click();
    });

    // Xác nhận trạng thái đã bị cấm
    cy.get('.shadow.p-4').eq(2).should('contain', 'Đã bị cấm');
  });

  it('Bỏ lệnh cấm người dùng', () => {
    // Chọn user thứ 2 đang bị cấm
    cy.get('.shadow.p-4').eq(2).should('contain', 'Đã bị cấm').click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains(/^Bỏ lệnh cấm$/).click();
      cy.contains('Lưu').click();
    });

    // Xác nhận trạng thái quay lại hoạt động
    cy.get('.shadow.p-4').eq(2).should('contain', 'Đang hoạt động');
  });
});
