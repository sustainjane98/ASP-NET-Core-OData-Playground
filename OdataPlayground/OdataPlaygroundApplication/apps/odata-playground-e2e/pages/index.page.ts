import { Page } from '@playwright/test';
import { ApplicationConfig } from '@odata-playground/odata/application-config';
import {
  dataTestIdGenerator,
  DataTestids,
} from '@odata-playground/odata-e2e/data-testids';
import { HttpMethod } from '@odata-playground/common/enums';

export class IndexPage {
  public constructor(private page: Page) {}
  public async goto() {
    await this.page.goto(ApplicationConfig.BASE_URL_PARAM);
  }

  public async waitForSuccessResponse(url: string, httpMethod: HttpMethod) {
    return await this.page.waitForResponse(
      (response) => {
        const responseStatuscode = response.status();
        const responseUrl = response.url();
        const requestHttpMethod = response.request().method();

        return (
          responseUrl.includes('Customer') &&
          responseStatuscode === 200 &&
          requestHttpMethod === httpMethod.toUpperCase()
        );
      },
      { timeout: 10 * 1000 }
    );
  }

  public async clickOnRequestPill(url: string, method: HttpMethod) {
    await this.page
      .locator(
        dataTestIdGenerator(
          DataTestids.Index.ODATA_ENDPOINT_SECTION_URL(url, method)
        )
      )
      .click();
  }

  public async clickSend() {
    await this.page
      .locator(dataTestIdGenerator(DataTestids.Index.SEND_BUTTON))
      .click();
  }
}
