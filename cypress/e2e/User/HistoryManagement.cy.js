/// <reference types="cypress" />
describe('Quản lý lịch sử xem', () => {
    beforeEach(() => {
        cy.loginAsAdmin(); // custom command
        cy.visit('/continue');
    });
    it('Hiển thị danh sách Continue Watching', () => {
        cy.contains('h2', 'Continue Watching').should('be.visible');
        cy.contains('Continue Watching')
            .parent() // div max-w-6xl
            .find('h3')
            .should('have.length.greaterThan', 0) // có ít nhất 1 phim
            .each(($title) => {
            cy.wrap($title).should('not.be.empty');
        });
        cy.contains('Continue Watching')
            .parent()
            .find('button')
            .contains('Resume')
            .should('exist');
    });
    it('Click Resume để tiếp tục xem', () => {
        cy.contains('Continue Watching')
            .parent()
            .find('button')
            .contains('Resume')
            .first()
            .click({ force: true });
    });
});
