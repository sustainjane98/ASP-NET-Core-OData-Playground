import { test } from '@playwright/test';
import {
  dataTestIdGenerator,
  DataTestids,
} from '@odata-playground/odata-e2e/data-testids';
import { HttpMethod } from '@odata-playground/common';

test.describe('Index Page', () => {
  test('Send a customer GET Request via Endpoint Section', async ({ page }) => {
    await page
      .locator(
        dataTestIdGenerator(
          DataTestids.Index.ODATA_ENDPOINT_SECTION_URL(
            'Customer',
            HttpMethod.GET
          )
        )
      )
      .click();

    await page
      .locator(dataTestIdGenerator(DataTestids.Index.SEND_BUTTON))
      .click();
  });
});
