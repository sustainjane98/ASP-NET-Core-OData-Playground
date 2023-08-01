import { Page, expect } from '@playwright/test';
import { ApplicationConfig } from '@odata-playground/odata/application-config';
import {
  dataTestIdGenerator,
  DataTestids,
} from '@odata-playground/odata-e2e/data-testids';
import { HttpMethod } from '@odata-playground/common/enums';
import { FilterVariants } from '@odata-playground/odata/config';

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
          responseStatuscode < 300 &&
          requestHttpMethod === httpMethod.toUpperCase()
        );
      },
      { timeout: 10 * 1000 }
    );
  }

  public async clickOnUrlTextfieldAutocompleteOption(
    key: (typeof FilterVariants)[0]['key']
  ) {
    await this.page
      .getByTestId(DataTestids.Index.URL_TEXTFIELD_AUTOCOMPLETE_OPTION(key))
      .click();
  }

  public async typeInUrlTextfield(url: string) {
    const textfield = await this.page.locator(
      `${dataTestIdGenerator(DataTestids.Index.URL_TEXTFIELD)} input`
    );
    await textfield.click();
    await textfield.focus();
    await textfield.type(url);
  }

  public async focusUrlTextfield() {
    await this.page
      .locator(`${dataTestIdGenerator(DataTestids.Index.URL_TEXTFIELD)}`)
      .focus();
  }

  public async selectHttpMethod(method: HttpMethod) {
    await this.page
      .getByTestId(DataTestids.Index.DROPDOWN_HTTP_METHOD())
      .click();

    await this.page
      .getByTestId(DataTestids.Index.DROPDOWN_HTTP_METHOD(method))
      .click();
  }

  public async snapshotResponseAreaWithCustomName(
    url: string,
    method: HttpMethod
  ) {
    const responseArea = await this.responseAreaText();

    expect(responseArea).toMatchSnapshot({ name: `${url}-${method}.txt` });
  }

  public async responseAreaText() {
    return await this.page.evaluate(
      async ([responseAreaDataTestId]) => {
        // The below instructions will run in the browser console ( context )
        const textarea = document.querySelector<HTMLTextAreaElement>(
          `${responseAreaDataTestId} textarea`
        );
        return textarea.value;
      },
      [dataTestIdGenerator(DataTestids.Index.RESPONSE_AREA)]
    );
  }

  public async clickOnRequestPill(url: string, method: HttpMethod) {
    await this.page
      .getByTestId(DataTestids.Index.ODATA_ENDPOINT_SECTION_URL(url, method))
      .click();
  }

  public async clickSend() {
    await this.page.getByTestId(DataTestids.Index.SEND_BUTTON).click();
  }
}
