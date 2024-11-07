const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Здесь вы можете добавить свои.node события, если нужно
    },
    supportFile: 'cypress/support/e2e.js',
  },
});
