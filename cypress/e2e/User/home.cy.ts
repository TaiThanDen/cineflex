/// <reference types="cypress" />

describe('Trang chủ CineFlex', () => {
  beforeEach(() => {
    cy.visit('/home')
  })

  it('Hiển thị thanh tìm kiếm', () => {
    cy.get('input[placeholder="Search for what you want to watch"]').should('be.visible')
  })

  it('Hiển thị tiêu đề phim nổi bật', () => {
    cy.contains('Desperate Mrs. Seonju').should('be.visible')
  })

  it('Hiển thị danh sách phim phổ biến', () => {
    cy.contains('Popular on CineFlex').should('be.visible')
    cy.contains('Inception').should('exist')
    cy.contains('The Dark Knight').should('exist')
  })

  it('Xem phim sau khi hiện quảng cáo', () => {
    cy.contains('Watch Now').click()

    cy.contains('Quảng cáo').should('exist')

    cy.contains('Xem phim')
        .scrollIntoView()
        .should('exist')
        .click({ force: true })

    cy.url().should('include', '/watch')
  })

})
