const { test, expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.btnCheckOut = page.locator(
      "#cart_contents_container button.checkout_button"
    );
    this.cartPageHeader = page.locator("#header_container .header_secondary_container span.title");
  }

  async verifyCartPageTitle(cartPageTitleTextToBeVerified) {
    await this.cartPageHeader.first().waitFor();
    const bool = this.cartPageHeader.isVisible();
    expect(bool).toBeTruthy();
    await expect(this.cartPageHeader).toContainText(cartPageTitleTextToBeVerified);
  }

  async clickBtnCheckoutOnCartPage(){
    await this.btnCheckOut.click();
  }

}

module.exports = { CartPage };
