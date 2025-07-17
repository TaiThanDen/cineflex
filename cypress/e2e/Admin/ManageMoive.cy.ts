/// <reference types="cypress" />

describe('Quản lý phim - Admin Dashboard', () => {
  beforeEach(() => {
    cy.visit('/admin/movies')
  })

  it('Hiển thị tiêu đề và danh sách phim', () => {
    cy.contains('Quản lý phim').should('be.visible')
    cy.get('img').should('have.length.greaterThan', 0)
    cy.contains('Breaking Bad').should('exist')
    cy.contains('Naruto').should('exist')
  })

  it('Tìm kiếm phim hoạt động', () => {
    cy.get('input[placeholder*="Tìm phim"]').type('Naruto')

    // ✅ Bấm nút tìm kiếm – dùng index nếu không có text
    cy.get('button').eq(0).click()

    cy.contains('Naruto').should('be.visible')
  })

  it('Click vào một phim để xem chi tiết', () => {
    cy.contains('Breaking Bad').click()

    // ✅ URL không phải /manage-movie, sửa lại
    cy.url().should('include', '/admin/movies/')

    cy.contains("Walter White").should('be.visible')
    cy.contains("Pilot").should('exist')
  })

  it('Hiển thị danh sách tập phim', () => {
    cy.contains('Breaking Bad').click()

    cy.contains('Pilot').should('exist')
    cy.contains("Cat's in the Bag...").should('exist')
    cy.get('table').should('exist')
    cy.contains('58 phút').should('exist')
  })

  it('Có nút thêm/xoá/chỉnh sửa phim và tập', () => {
    cy.contains('Breaking Bad').click()

    // ✅ Nút thêm mùa & tập
    cy.contains('+ Thêm mùa phim').should('exist')
    cy.contains('+ Thêm tập phim').should('exist')

    // ✅ Kiểm tra trong hàng đầu tiên của bảng tập phim
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', '✏ Edit').should('exist')
      cy.contains('button', '🗑 Xóa').should('exist')
      cy.contains('button', '💬 Bình luận').should('exist')
    })
  })
})
