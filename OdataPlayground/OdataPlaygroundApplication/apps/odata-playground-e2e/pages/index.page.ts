import { Page } from '@playwright/test';
import { ApplicationConfig } from '@odata-playground/odata/application-config';

export class IndexPage {
  public constructor(private page: Page) {}
  public async visitWithBackendConnected() {
    await this.page.goto(ApplicationConfig.BASE_URL_PARAM);
  }
}
