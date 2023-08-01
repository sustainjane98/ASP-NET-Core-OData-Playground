import localConfig from './playwright-local.config';
import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  ...localConfig,
  retries: 2,
  forbidOnly: true,
  projects: [
    ...localConfig.projects,
    { name: 'firefox hidpi', use: { ...devices['Desktop Firefox HiDPI'] } },
    { name: 'chromium hidpi ', use: { ...devices['Desktop Chrome HiDPI'] } },
    { name: 'edge', use: { ...devices['Desktop Edge'] } },
    { name: 'edge hidpi', use: { ...devices['Desktop Edge HiDPI'] } },
  ],
};

export default config;
