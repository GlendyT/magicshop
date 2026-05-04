import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined, // Aumentado de 1 a 2 para mejor balance
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    // Aumentar timeouts en CI para elementos lentos
    actionTimeout: process.env.CI ? 60000 : 30000, // 60s en CI, 30s local
    navigationTimeout: process.env.CI ? 60000 : 30000,
  },
  // Timeout global por test
  timeout: process.env.CI ? 90000 : 30000, // 90s en CI, 30s local

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI, // En CI siempre iniciar servidor fresco
    timeout: 180 * 1000, // 3 minutos para CI (compilación inicial puede ser lenta)
    stdout: 'pipe', // Capturar logs para debugging
    stderr: 'pipe',
  },
});

//CI=true npm run test:e2e