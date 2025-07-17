/// <reference types="cypress" />

describe('Tìm kiếm phim - CineFlex', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Hiển thị ô tìm kiếm', () => {
    cy.get('input[placeholder="Search for what you want to watch"]').should('be.visible')
  })

  it('Tìm kiếm phim có kết quả', () => {
    cy.get('input[placeholder="Search for what you want to watch"]')
        .type('Inception')

    cy.contains('Inception', { timeout: 5000 }).should('exist')
  })

  it('Tìm kiếm phim không tồn tại', () => {
    cy.get('input[placeholder="Search for what you want to watch"]')
        .clear()
        .type('KhôngCóPhimNày123')

    cy.contains(/không tìm thấy|no results|not found/i).should('exist')
  })
})
