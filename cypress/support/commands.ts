/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
/// <reference types="cypress" />

Cypress.Commands.add("loginAsAdmin", () => {
    cy.request("POST", "https://cineflex.mooo.com/api/authentication/login", {
        email: "tuanhhhts00576@fpt.edu.vn",
        password: "admin123456",
    }).then((response) => {
        const token = response.body;
        cy.window().then((win) => {
            win.localStorage.setItem("auth", token);
        });
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginAsAdmin(): Chainable<void>;
        }
    }
}
export {};

