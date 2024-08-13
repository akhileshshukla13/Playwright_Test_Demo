const { chromium,test,expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const { CommonUtilityMethods } = require("../utils/CommonUIUtilityMethods");
const testData = JSON.parse(
  JSON.stringify(require("../test-data/TestData.json"))
);

let newestPage='';
//test.use({ browserName: 'webkit'});
test.describe("Login Page Test Suite", () => {
  test.beforeEach(async () => {
    const browser = await chromium.launch({
      logger: {
        isEnabled: (name, severity) => true,
        log: (name, severity, message, args) => console.log(`${name} ${message} ${severity} ${args}`)
      }
    });
    const context = await browser.newContext({ acceptDownloads: true });
    newestPage = await context.newPage();
    const poManager = new POManager(newestPage);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testData.env.url);
  });

  test("User is able to login with valid credential", async () => {
    const poManager = new POManager(newestPage);
    const utilityMethods = new CommonUtilityMethods(newestPage);
    const loginPage = poManager.getLoginPage();
    await utilityMethods.verifyURL(testData.env.url);
    await loginPage.verifyPageHeader(testData.pageTitles.pageTitle1);
    await loginPage.fillUserName(testData.userCreds.valid_creds);
    await loginPage.fillPassword(testData.userCreds.password);
    await loginPage.clickLoginButton();
    console.log("The user is successfully logged in with valid credentals");
  });

  test("User is not able to login with invalid credential", async () => {
    const poManager = new POManager(newestPage);
    const utilityMethods = new CommonUtilityMethods(newestPage);
    const loginPage = poManager.getLoginPage();
    await utilityMethods.verifyURL(testData.env.url);
    await loginPage.verifyPageHeader(testData.pageTitles.pageTitle1);
    await loginPage.fillUserName("locked_out_user");
    await loginPage.fillPassword(testData.userCreds.password);
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage(
      "Epic sadface: Sorry, this user has been locked out."
    );
    console.log(
      "As expected the user is unable to login with invalid credentials"
    );
  });

  test("Verify the valid logged in user is able to login and add items into the cart", async () => {
    const poManager = new POManager(newestPage);
    const utilityMethods = new CommonUtilityMethods(newestPage);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    await utilityMethods.verifyURL(testData.env.url);
    await loginPage.verifyPageHeader(testData.pageTitles.pageTitle1);
    await loginPage.fillUserName(testData.userCreds.valid_creds);
    await loginPage.fillPassword(testData.userCreds.password);
    await loginPage.clickLoginButton();
    console.log("The user is successfully logged in with valid credentals");
    await homePage.verifyPageTitle(testData.pageTitles.pageTitle2);
    console.log("The user traversed to Products page");
    await utilityMethods.selectProduct(testData.productDetails.product1);
    await utilityMethods.removeButtonStatus(testData.productDetails.product1);
  });

  test("Verify the valid logged in user is shown 'Yout information' page post clicking on the 'Checkout' button", async () => {
    const poManager = new POManager(newestPage);
    const utilityMethods = new CommonUtilityMethods(newestPage);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();
    const customerInformationPage = poManager.getCustomerInformationPage();
    await utilityMethods.verifyURL(testData.env.url);
    await loginPage.verifyPageHeader(testData.pageTitles.pageTitle1);
    await loginPage.fillUserName(testData.userCreds.valid_creds);
    await loginPage.fillPassword(testData.userCreds.password);
    await loginPage.clickLoginButton();
    console.log("The user is successfully logged in with valid credentals");
    await homePage.verifyPageTitle(testData.pageTitles.pageTitle2);
    console.log("The user traversed to Products page");
    await utilityMethods.selectProduct(testData.productDetails.product1);
    await utilityMethods.removeButtonStatus(testData.productDetails.product1);
    await homePage.clickBtnShoppingCart();
    await cartPage.verifyCartPageTitle(testData.pageTitles.pageTitle3);
    await cartPage.clickBtnCheckoutOnCartPage();
    await customerInformationPage.verifyPageTitle(
      testData.pageTitles.pageTitle5
    );
  });

  test("Verify the valid logged in user is able to continue to next page post filling the details in the 'Yout information' page", async () => {
    const poManager = new POManager(newestPage);
    const utilityMethods = new CommonUtilityMethods(newestPage);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();
    const customerInformationPage = poManager.getCustomerInformationPage();
    const checkoutPage = poManager.getCheckoutPage();
    await utilityMethods.verifyURL(testData.env.url);
    await loginPage.verifyPageHeader(testData.pageTitles.pageTitle1);
    await loginPage.fillUserName(testData.userCreds.valid_creds);
    await loginPage.fillPassword(testData.userCreds.password);
    await loginPage.clickLoginButton();
    console.log("The user is successfully logged in with valid credentals");
    await homePage.verifyPageTitle(testData.pageTitles.pageTitle2);
    console.log("The user traversed to Products page");
    await utilityMethods.selectProduct(testData.productDetails.product1);
    await utilityMethods.removeButtonStatus(testData.productDetails.product1);
    await homePage.clickBtnShoppingCart();
    await cartPage.verifyCartPageTitle(testData.pageTitles.pageTitle3);
    await cartPage.clickBtnCheckoutOnCartPage();
    await customerInformationPage.verifyPageTitle(
      testData.pageTitles.pageTitle5
    );
    console.log("The user traversed to 'Your information page'");
    await customerInformationPage.fillFirstNameField(
      testData.userInformation.userFirstName
    );
    await customerInformationPage.fillLastNameField(
      testData.userInformation.userLastName
    );
    await customerInformationPage.fillPostalCode(
      testData.userInformation.userAreaPostalCode
    );
    console.log(
      "The user has filled all the details in the 'Your information page'"
    );
    await customerInformationPage.clickBtnContinue();
    await checkoutPage.verifyCheckoutPageHeader(testData.pageTitles.pageTitle4);
  });

  test("Verify the valid logged in user is able to continue to next page after the 'Checkout: Overview ' page", async () => {
    const poManager = new POManager(newestPage);
    const utilityMethods = new CommonUtilityMethods(newestPage);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();
    const customerInformationPage = poManager.getCustomerInformationPage();
    const checkoutPage = poManager.getCheckoutPage();

    await loginPage.goTo(testData.env.url);
    await utilityMethods.verifyURL(testData.env.url);
    await loginPage.verifyPageHeader(testData.pageTitles.pageTitle1);
    await loginPage.fillUserName(testData.userCreds.valid_creds);
    await loginPage.fillPassword(testData.userCreds.password);
    await loginPage.clickLoginButton();
    console.log("The user is successfully logged in with valid credentals");
    await homePage.verifyPageTitle(testData.pageTitles.pageTitle2);
    console.log("The user traversed to Products page");
    await utilityMethods.selectProduct(testData.productDetails.product1);
    await utilityMethods.removeButtonStatus(testData.productDetails.product1);
    await homePage.clickBtnShoppingCart();
    await cartPage.verifyCartPageTitle(testData.pageTitles.pageTitle3);
    await cartPage.clickBtnCheckoutOnCartPage();
    await customerInformationPage.verifyPageTitle(
      testData.pageTitles.pageTitle5
    );
    console.log("The user traversed to 'Your information page'");
    await customerInformationPage.fillFirstNameField(
      testData.userInformation.userFirstName
    );
    await customerInformationPage.fillLastNameField(
      testData.userInformation.userLastName
    );
    await customerInformationPage.fillPostalCode(
      testData.userInformation.userAreaPostalCode
    );
    console.log(
      "The user has filled all the details in the 'Your information page'"
    );
    await customerInformationPage.clickBtnContinue();
    await checkoutPage.verifyCheckoutPageHeader(testData.pageTitles.pageTitle4);
    const bool =
      (await utilityMethods.getSumOfPricesOfTheProductPresentInTheCart()) +
        (await utilityMethods.getTotalTaxtOfTheProductPresentInTheCart()) ===
      (await checkoutPage.getTotalSumFromTheCartPage());
    expect(bool).toBeTruthy();
    console.log("Final cart value is correct");

    const Excel = require("exceljs");
    const fileName = "Product_Costing_Details.xlsx";
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet("Product Details Sheet");

    ws.getCell("A1").value = "SumOfPricesOfTheProductPresentInTheCart";
    ws.getCell("B1").value = "TotalTaxtOfTheProductPresentInTheCart";
    ws.getCell("C1").value = "TotalSumFromTheCartPage";

    const r3 = ws.getRow(3);
    r3.values = [await utilityMethods.getSumOfPricesOfTheProductPresentInTheCart(), await utilityMethods.getTotalTaxtOfTheProductPresentInTheCart(), await checkoutPage.getTotalSumFromTheCartPage()];

    wb.xlsx
      .writeFile(fileName)
      .then(() => {
        console.log("File is created");
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});
