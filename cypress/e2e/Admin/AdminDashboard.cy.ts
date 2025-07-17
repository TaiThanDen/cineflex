/// <reference types="cypress" />

describe('Admin Dashboard', () => {
  beforeEach(() => {
    cy.visit('/admin/dashboard') // Đổi lại nếu route khác
  })

  it('Hiển thị tổng quan dashboard', () => {
    cy.contains('Dashboard Overview').should('be.visible')
    cy.contains('Total Users').should('be.visible')
    cy.contains('Total Movie').should('be.visible')
    cy.contains('Total Profit').should('be.visible')
  })

  it('Hiển thị thông tin người dùng (User Stats)', () => {
    cy.contains('Active users').scrollIntoView().should('be.visible')
    cy.contains('New Signups').should('be.visible')
    cy.contains('Subscribed').should('be.visible')
  })

  it('Hiển thị biểu đồ User Growth', () => {
    cy.contains('User Growth') // tìm tiêu đề chart
        .scrollIntoView()
        .should('be.visible')
        .parent() // div ChartBox bao quanh
        .within(() => {
          cy.get('div.apexcharts-canvas').should('exist')
          cy.get('svg').should('exist')
        })
  })

  it('Hiển thị biểu đồ Revenue Summary', () => {
    cy.contains('Revenue Summary From Subscribers')
        .scrollIntoView()
        .should('be.visible')
        .parent()
        .within(() => {
          cy.get('div.apexcharts-canvas').should('exist')
          cy.get('svg').should('exist')
        })
  })


  it('Hiển thị biểu đồ Top Movie Genres', () => {
    cy.contains('Top Movie Genres').scrollIntoView().should('be.visible')
    cy.contains('Anime').should('exist')
    cy.contains('Action').should('exist')
  })

  it('Hiển thị biểu đồ Top Blog Genres', () => {
    cy.contains('Top Blog Genres').scrollIntoView().should('be.visible')
    cy.contains('Review').should('exist')
    cy.contains('News').should('exist')
  })

  it('Hiển thị bảng Most Popular Podcast', () => {
    cy.contains('Most Popular Podcast').scrollIntoView().should('be.visible')
    cy.contains('Nursing Today').should('exist')
    cy.contains('Dr. Smith').should('exist')
    cy.contains('Free').should('exist')
    cy.contains('Premium').should('exist')
  })

  it('Sidebar có đầy đủ mục quản lý', () => {
    cy.get('aside').should('be.visible')
    cy.contains('Dashboard').should('exist')
    cy.contains('Manage Movie').should('exist')
    cy.contains('Manage Quiz').should('exist')
    cy.contains('Manage Users').should('exist')
    cy.contains('Subscription').should('exist')
    cy.contains('Content Moderation').should('exist')
    cy.contains('Settings').should('exist')
  })
})
