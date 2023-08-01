import { test } from '../fixtures/index.fixture';
import { HttpMethod } from '@odata-playground/common/enums';
import { FilterVariantBasic } from '@odata-playground/odata/config';
import { FilterQueryOperatorsBasic } from '@odata-playground/odata/config';

test.describe('Index Page', () => {
  test('Send a customer GET Request via Endpoint Section', async ({
    indexPage,
  }) => {
    const url = 'Customer';
    const method = HttpMethod.GET;

    await indexPage.clickOnRequestPill(url, method);
    await Promise.all([
      indexPage.waitForSuccessResponse(url, method),
      await indexPage.clickSend(),
    ]);
    await indexPage.snapshotResponseAreaWithCustomName(url, method);
  });

  test('Send a customer GET Request via TextField', async ({ indexPage }) => {
    const url = 'Customer';
    const method = HttpMethod.GET;

    await indexPage.typeInUrlTextfield(`/${url}`);
    await Promise.all([
      indexPage.waitForSuccessResponse(url, method),
      await indexPage.clickSend(),
    ]);
    await indexPage.snapshotResponseAreaWithCustomName(url, method);
  });

  test('Send a customer POST Request via Endpoint Section', async ({
    indexPage,
  }) => {
    const url = 'Customer';
    const method = HttpMethod.POST;

    await indexPage.clickOnRequestPill(url, method);
    await Promise.all([
      indexPage.waitForSuccessResponse(url, method),
      indexPage.clickSend(),
    ]);
    await indexPage.snapshotResponseAreaWithCustomName(url, method);
  });

  test('Send a customer POST Request via TextField', async ({ indexPage }) => {
    const url = 'Customer';
    const method = HttpMethod.POST;

    await indexPage.typeInUrlTextfield(`/${url}`);
    await indexPage.selectHttpMethod(method);
    await Promise.all([
      indexPage.waitForSuccessResponse(url, method),
      indexPage.clickSend(),
    ]);
    await indexPage.snapshotResponseAreaWithCustomName(url, method);
  });

  test('Send a customer GET Request via Pill and add filter', async ({
    indexPage,
  }) => {
    const url = 'Customer';
    const method = HttpMethod.GET;

    await indexPage.clickOnRequestPill(url, method);
    await indexPage.typeInUrlTextfield(`?`);
    await indexPage.clickOnUrlTextfieldAutocompleteOption(
      FilterVariantBasic.FILTER
    );
    await indexPage.focusUrlTextfield();
    await indexPage.clickOnUrlTextfieldAutocompleteOption(
      FilterQueryOperatorsBasic.EQUALS
    );
  });
});
