/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("Cannot read properties of null")) {
        return false;
    }
});
const viewports = [
    { label: 'Mobile', width: 375, height: 667 },
    { label: 'Tablet', width: 768, height: 1024 },
    { label: 'Desktop', width: 1280, height: 800 }
];
describe('Responsive Test - CineFlex', () => {
    viewports.forEach(({ label, width, height }) => {
        it(`Hiển thị đúng trên ${label} (${width}x${height})`, () => {
            cy.viewport(width, height);
            cy.visit('/home');
            cy.get('input[placeholder="Search for what you want to watch"]').should('be.visible');
            if (label === 'Mobile') {
                cy.contains('Lupin the 3rd').should('exist');
            }
            else {
                cy.contains('Lupin the 3rd', { timeout: 10000 })
                    .scrollIntoView()
                    .should('be.visible');
            }
            cy.contains('CINEFLEX').should('exist');
            if (label === 'Mobile') {
                cy.get('button, svg').should('exist');
            }
            cy.get('nav, footer, aside').should('exist');
        });
    });
});
