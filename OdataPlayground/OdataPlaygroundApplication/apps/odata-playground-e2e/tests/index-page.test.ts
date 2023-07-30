import { test } from '@playwright/test';
import { HttpMethod } from '@odata-playground/common/enums';
import { IndexPage } from '../pages/index.page';

test.describe('Index Page', () => {
  let indexPage: IndexPage;

  test.beforeEach(async ({ page }) => {
    indexPage = new IndexPage(page);
    await indexPage.goto();
  });

  test('Send a customer GET Request via Endpoint Section', async () => {
    await indexPage.clickOnRequestPill('Customer', HttpMethod.GET);
    await Promise.all([
      indexPage.waitForSuccessResponse('Customer', HttpMethod.GET),
      await indexPage.clickSend(),
    ]);
  });

  test('Send a customer POST Request via Endpoint Section', async () => {
    await indexPage.clickOnRequestPill('Customer', HttpMethod.POST);
    const customerPostResponse = indexPage.waitForSuccessResponse(
      'Customer',
      HttpMethod.POST
    );
    await indexPage.clickSend();
    await customerPostResponse;
  });
});
