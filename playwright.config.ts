import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",

  fullyParallel: !isCI,

  forbidOnly: isCI,

  retries: isCI ? 2 : 0,

  workers: isCI ? 1 : undefined,

  reporter: [
    ["html", { open: "never" }],
    ["list"],
  ],

  timeout: isCI ? 120_000 : 30_000,

  expect: {
    timeout: isCI ? 30_000 : 10_000,
  },

  use: {
    baseURL: "http://localhost:3000",

    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    actionTimeout: isCI ? 60_000 : 30_000,
    navigationTimeout: isCI ? 60_000 : 30_000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],

  webServer: {
    command: isCI ? "npm run build && npm run start" : "npm run dev",

    url: "http://localhost:3000",

    reuseExistingServer: !isCI,

    timeout: isCI ? 300_000 : 180_000,

    stdout: "pipe",
    stderr: "pipe",

    /**
     * IMPORTANTE:
     * No seteamos variables como "".
     * Dejamos que:
     * - local use .env.local
     * - GitHub Actions use env/secrets del workflow
     */
    env: {
      ...process.env,

      /**
       * Esta sí la podemos forzar porque es local para los tests.
       */
      NEXT_PUBLIC_BASE_URL:
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    },
  },
});