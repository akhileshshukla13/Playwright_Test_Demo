const {test, expect} = require('@playwright/test');

class CustomerInformationPage {
  constructor(page) {
    this.page = page;
    this.customerInformationPageHeader = page.locator(
      "#header_container .header_secondary_container"
    );
    this.firstNameField = page.locator("form .checkout_info #first-name");
    this.lastNameField = page.locator("form .checkout_info #last-name");
    this.postalCode = page.locator("form .checkout_info #postal-code");
    this.btnContinue = page.locator(".checkout_buttons input#continue");
  }

  async verifyPageTitle(customerInformationPageTitleTextToBeVerified) {
    await this.customerInformationPageHeader.first().waitFor();
    const bool = await this.customerInformationPageHeader.isVisible();
    expect(bool).toBeTruthy();
    await expect(this.customerInformationPageHeader).toContainText(customerInformationPageTitleTextToBeVerified);
  }

  async fillFirstNameField(passwordText) {
    await this.firstNameField.fill(passwordText);
  }

  async fillLastNameField(lastNameText) {
    await this.lastNameField.fill(lastNameText);
  }

  async fillPostalCode(postalCodeText) {
    await this.postalCode.fill(postalCodeText);
  }

  async clickBtnContinue() {
    await this.btnContinue.click();
  }
}

module.exports = { CustomerInformationPage };
