const { test, expect } = require("@playwright/test");
class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginPageLogo = page.locator(".login_logo");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator("#login_button_container .error-message-container h3");
  }

  async goTo(urlUnderTest) {
    await this.page.goto(urlUnderTest);
  }

  async fillUserName(userNameText) {
    await this.userName.fill(userNameText);
  }

  async fillPassword(passwordText) {
    await this.password.fill(passwordText);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async verifyPageHeader(textToBeVerified) {
    await expect(this.loginPageLogo).toContainText(textToBeVerified);
  }

  async verifyErrorMessage(errorMessage){
    await this.errorMessage.first().waitFor();
    const bool = this.errorMessage.isVisible();
    expect(bool).toBeTruthy();
    await expect(this.errorMessage).toContainText(errorMessage);
  }
}

module.exports = { LoginPage };
