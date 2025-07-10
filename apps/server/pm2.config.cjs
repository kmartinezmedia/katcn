module.exports = {
  name: 'server', // Name of your application
  script: './src/index.ts', // Entry point of your application
  interpreter: 'bun', // Bun interpreter
  env: {
    PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
    PORT: process.env.PORT,
    GIT_WEBHOOK_SECRET: process.env.GIT_WEBHOOK_SECRET,
  },
};
