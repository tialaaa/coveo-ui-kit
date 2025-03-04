import {BasePageObject} from '@/playwright-utils/base-page-object';
import {Page} from '@playwright/test';

export class NoProductsPageObject extends BasePageObject<'atomic-commerce-no-products'> {
  constructor(page: Page) {
    super(page, 'atomic-commerce-no-products');
  }

  searchTips() {
    return this.page.locator('[part=search-tips]');
  }

  ariaLive(query?: string) {
    const text = query
      ? `We couldn't find any product for ${query}`
      : 'No products';

    return this.page.getByRole('status').filter({hasText: text});
  }

  message(query?: string) {
    return this.page.locator('[part="no-results"]', {
      hasText: query
        ? `We couldn't find any product for “${query}”`
        : 'No products',
    });
  }
}
