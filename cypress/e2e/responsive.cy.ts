/// <reference types="cypress" />

const viewports = [
  { label: 'Mobile', width: 375, height: 667 },
  { label: 'Tablet', width: 768, height: 1024 },
  { label: 'Desktop', width: 1280, height: 800 }
]

describe('Responsive Test - CineFlex', () => {
  viewports.forEach(({ label, width, height }) => {
    it(`Hiển thị đúng trên ${label} (${width}x${height})`, () => {
      cy.viewport(width, height)
      cy.visit('/')

      // ✅ Kiểm tra thanh tìm kiếm
      cy.get('input[placeholder="Search for what you want to watch"]').should('be.visible')

      // ✅ Kiểm tra tiêu đề phim nổi bật (ẩn trên mobile thì chỉ kiểm tra tồn tại)
      if (label === 'Mobile') {
        cy.contains('Desperate Mrs. Seonju').should('exist')
      } else {
        cy.contains('Desperate Mrs. Seonju', { timeout: 10000 })
            .scrollIntoView()
            .should('be.visible')
      }

      // ✅ Kiểm tra logo hoặc tiêu đề
      cy.contains('CINEFLEX').should('exist')

      // ✅ Kiểm tra có nút toggle/menu trên Mobile
      if (label === 'Mobile') {
        cy.get('button, svg').should('exist')
      }

      // ✅ Kiểm tra có menu/side/footer trên các thiết bị
      cy.get('nav, footer, aside').should('exist')
    })
  })
})
