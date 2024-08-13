const {test, expect} = require('@playwright/test');

class HomePage {
    constructor(page) {
      this.page = page;
      this.pageTitle = page.locator("#header_container .header_secondary_container .title");
      this.btnShoppingCart = page.locator(".header_container .primary_header .shopping_cart_link");
    }
  
    async verifyPageTitle(textToBeVerified) {
      await this.pageTitle.first().waitFor();
      const bool = this.pageTitle.isVisible();
      expect(bool).toBeTruthy();
      await expect(this.pageTitle).toContainText(textToBeVerified);
    }

    async clickBtnShoppingCart(){
        await this.btnShoppingCart.click();
    } 
}

module.exports = { HomePage };