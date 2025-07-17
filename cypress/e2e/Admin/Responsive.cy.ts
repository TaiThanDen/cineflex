/// <reference types="cypress" />

const viewports = [
  { label: 'Mobile', width: 375, height: 667 },
  { label: 'Tablet', width: 768, height: 1024 },
  { label: 'Desktop', width: 1280, height: 800 }
]

describe('Admin Dashboard - Responsive', () => {
  viewports.forEach((vp) => {
    describe(`${vp.label} View`, () => {
      beforeEach(() => {
        cy.viewport(vp.width, vp.height)
        cy.visit('/admin/dashboard')
      })

      it('Hiển thị tổng quan', () => {
        cy.contains('Dashboard Overview').should('exist')
        cy.contains('Total Users').should('exist')
        cy.contains('Total Movie').should('exist')
        cy.contains('Total Profit').should('exist')
      })

      it('Hiển thị biểu đồ User Growth', () => {
        cy.contains('User Growth')
            .scrollIntoView()
            .should(vp.label === 'Mobile' ? 'exist' : 'be.visible')
            .parent()
            .within(() => {
              cy.get('div.apexcharts-canvas').should('exist')
            })
      })

      it('Hiển thị bảng podcast', () => {
        cy.contains('Most Popular Podcast')
            .scrollIntoView()
            .should(vp.label === 'Mobile' ? 'exist' : 'be.visible')

        cy.contains('Free').should('exist')
        cy.contains('Premium').should('exist')
      })

      it('Hiển thị sidebar', () => {
        cy.get('aside').should('exist') // với mobile có thể bị ẩn nhưng vẫn nên kiểm
        cy.contains('Dashboard').should('exist')
        cy.contains('Manage Movie').should('exist')
        cy.contains('Manage Quiz').should('exist')
        cy.contains('Manage Users').should('exist')
      })
    })
  })
})
