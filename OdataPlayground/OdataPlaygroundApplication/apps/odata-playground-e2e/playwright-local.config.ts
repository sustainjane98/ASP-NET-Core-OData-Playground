import { PlaywrightTestConfig, devices } from '@playwright/test';
import { ApplicationConfig } from '@odata-playground/odata/application-config';

const config: PlaywrightTestConfig = {
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: '../../dist/apps/odata-playground-e2e/html',
      },
    ],
    ['list', { printSteps: true }],
  ],
  testDir: './tests',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: false,
  /* Retry on CI only */
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: undefined,

  outputDir: '../../dist/apps/odata-playground-e2e/assets',
  /* TestOptions https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: ApplicationConfig.TESTING_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-test-id',
  },
  projects: [
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
};

export default config;
