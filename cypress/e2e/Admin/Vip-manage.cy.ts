/// <reference types="cypress" />

describe('Admin - Quản lý VIP', () => {
  beforeEach(() => {
    cy.loginAsAdmin(); 
    cy.visit('/admin/subscription');
  });

  it('Hiển thị tiêu đề và bảng VIP', () => {
    cy.contains('Quản lý VIP').should('be.visible');

    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('Kiểm tra cột và dữ liệu trong bảng', () => {
    cy.get('table thead').within(() => {
      cy.contains('Người dùng').should('exist');
      cy.contains('Ngày bắt đầu').should('exist');
      cy.contains('Ngày kết thúc').should('exist');
      cy.contains('Hành động').should('exist');
    });

    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(1).should('not.be.empty'); 
      cy.get('td').eq(2).should('not.be.empty'); 
      cy.get('td').eq(3).should('not.be.empty'); 
    });
  });

  it('Mở modal chi tiết và kiểm tra thông tin', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('Chi tiết').click();
    });

    cy.get('div[role="dialog"]').should('be.visible').within(() => {
      cy.contains('Người dùng:').should('exist');
      cy.contains('Email:').should('exist');
      cy.contains('Ngày bắt đầu:').should('exist');
      cy.contains('Ngày kết thúc:').should('exist');

      cy.get('table tbody tr')
        .should('have.length.greaterThan', 0)
        .first()
        .within(() => {
          cy.get('td').eq(0).should('not.be.empty'); 
          cy.get('td').eq(1).should('not.be.empty'); 
          cy.get('td').eq(2).should('not.be.empty'); 
          cy.get('td').eq(3).should('not.be.empty'); 
        });
    });
  });


});
