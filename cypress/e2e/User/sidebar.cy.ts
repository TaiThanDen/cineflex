/// <reference types="cypress" />

describe('Sidebar Test - CineFlex', () => {
  context('Desktop View (1280x800)', () => {
    beforeEach(() => {
      cy.viewport(1280, 800)
      cy.visit('/')
    })

  })

  context('Mobile View (375x667)', () => {
    beforeEach(() => {
      cy.viewport(375, 667)
      cy.visit('/')
    })

    it('Có nút mở sidebar (menu toggle)', () => {
      cy.get('button, svg').first().should('exist')
    })

  })
})
