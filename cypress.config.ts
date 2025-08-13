import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'khcwsc',
  e2e: {
    baseUrl: 'https://cineflexz.netlify.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
