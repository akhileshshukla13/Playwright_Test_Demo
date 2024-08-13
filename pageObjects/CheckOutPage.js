const { test, expect } = require("@playwright/test");

class CheckOutPage {
  constructor(page) {
    this.page = page;
    this.checkoutPageHeader = page.locator(
      "#header_container .header_secondary_container span.title"
    );
    this.totalSumFromTheCartPage = page.locator(
      ".summary_info .summary_total_label"
    );
  }

  async verifyCheckoutPageHeader(checkoutPageTitleTextToBeVerified) {
    await this.checkoutPageHeader.first().waitFor();
    const bool = this.checkoutPageHeader.isVisible();
    expect(bool).toBeTruthy();
    await expect(this.checkoutPageHeader).toContainText(
      checkoutPageTitleTextToBeVerified
    );
  }

  async getTotalSumFromTheCartPage() {
    await this.totalSumFromTheCartPage.first().waitFor();
    let totalAmountFromCheckOutPage = await this.totalSumFromTheCartPage.first().textContent();
    return parseFloat(totalAmountFromCheckOutPage.replace(/[^\d.]/g,"").trim());
  }
}

module.exports = { CheckOutPage };
