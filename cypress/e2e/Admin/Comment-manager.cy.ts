/// <reference types="cypress" />

describe('CommentMovieDetail - Giao diện quản lý bình luận', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/admin/movies/1');
  });

  it('Hiển thị danh sách tập và có nút Bình luận', () => {
    // Kiểm tra bảng tập phim
    cy.contains('Tên tập').should('be.visible');
    cy.contains('💬 Bình luận').should('exist');
  });

  it('Click nút Bình luận thì hiển thị phần bình luận', () => {
    // Click nút "💬 Bình luận" ở tập đầu tiên
    cy.get('tbody tr').first().within(() => {
      cy.contains('💬 Bình luận').click();
    });

    // Kiểm tra phần tiêu đề bình luận
    cy.contains('Bình luận - Tập:').should('be.visible');

    // Kiểm tra bảng bình luận có cột đúng
    cy.get('table thead').within(() => {
      cy.contains('Tên người dùng').should('exist');
      cy.contains('Nội dung').should('exist');
      cy.contains('Trạng thái').should('exist');
      cy.contains('Hành động').should('exist');
    });
  });

  it('Trong bảng bình luận có các nút Ẩn/Hiện và Xóa', () => {
    cy.get('tbody tr').first().within(() => {
      cy.contains('💬 Bình luận').click();
    });

    cy.contains('Bình luận - Tập:').should('be.visible');

    // Kiểm tra có ít nhất 1 dòng bình luận
    cy.get('tbody tr').should('have.length.greaterThan', 0);

    // Kiểm tra các nút hành động trong bình luận đầu tiên
    cy.get('tbody tr').first().within(() => {
      cy.contains(/Ẩn|Hiện/).should('exist');
      cy.contains('Xóa').should('exist');
    });
  });

  it('Quay lại danh sách tập sau khi xem bình luận', () => {
    cy.get('table tbody tr').eq(0).within(() => {
      cy.contains('💬 Bình luận').click();
    });

    cy.contains('← Quay lại danh sách tập').click();

    // Kiểm tra danh sách tập xuất hiện lại
    cy.contains('Tên tập').should('be.visible');
    cy.contains('💬 Bình luận').should('exist');
  });
});
