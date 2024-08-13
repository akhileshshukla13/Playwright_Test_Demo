const { CartPage } = require("./CartPage");
const { CheckOutPage } = require("./CheckOutPage");
const { CustomerInformationPage } = require("./CustomerInformationPage");
const { HomePage } = require("./HomePage");
const { LoginPage } = require("./LoginPage");
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.customerInformationPage = new CustomerInformationPage(this.page);
    this.checkOutPage = new CheckOutPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getCustomerInformationPage() {
    return this.customerInformationPage;
  }

  getCheckoutPage() {
    return this.checkOutPage;
  }

  getCartPage() {
    return this.cartPage;
  }
}
module.exports = { POManager };
