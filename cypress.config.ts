import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://cineflexz.netlify.app/",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.ts",
  },
});
