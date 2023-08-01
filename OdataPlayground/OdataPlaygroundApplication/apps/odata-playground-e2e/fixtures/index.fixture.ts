import { test as base } from '@playwright/test';
import { IndexPage } from '../pages/index.page';

export const test = base.extend<{ indexPage: IndexPage }>({
  indexPage: async ({ page }, use) => {
    const indexPage = new IndexPage(page);
    await indexPage.goto();
    await use(indexPage);
  },
});
