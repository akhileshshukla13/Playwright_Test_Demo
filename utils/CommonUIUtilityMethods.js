const { test, expect } = require("@playwright/test");

class CommonUtilityMethods {
  constructor(page) {
    this.page = page;

    this.inventoryItemName = page.locator(
      "#inventory_container .inventory_item_description .inventory_item_label .inventory_item_name"
    );

    this.inventoryPrimaryButton = page.locator(
      "#inventory_container .inventory_item_description .pricebar button.btn_primary"
    );

    this.inventorySecondaryButton = page.locator(
      "#inventory_container .inventory_item_description .pricebar button.btn_secondary"
    );

    this.finalCartList = page.locator(".cart_list .inventory_item_price");

    this.finalTaxOnTheCart = page.locator(".summary_info .summary_tax_label");
  }

  async verifyURL(urlUnderTest) {
    await expect(this.page).toHaveURL(urlUnderTest);
  }

  async selectProduct(productNameTextToBeSelected) {
    await this.inventoryItemName.first().waitFor();
    const bool = await this.inventoryItemName.first().isVisible();
    expect(bool).toBeTruthy();

    const count = await this.inventoryItemName.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.inventoryItemName.nth(i).textContent()) ===
        productNameTextToBeSelected
      ) {
        //Add to cart
        await this.inventoryPrimaryButton.nth(i).click();
        break;
      }
    }
  }

  async removeButtonStatus(productNameTextToVerifyRemoveButtonStatus) {
    await this.inventoryItemName.first().waitFor();
    const bool = await this.inventoryItemName.first().isVisible();
    expect(bool).toBeTruthy();

    const count = await this.inventoryItemName.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.inventoryItemName.nth(i).textContent()) ===
        productNameTextToVerifyRemoveButtonStatus
      ) {
        //Remove Button Status Verification
        if (await this.inventorySecondaryButton.isDisabled()) {
          console.log("Remove button exist and is disabled!!");
        } else {
          console.log("Remove button exist and is enabled!!");
        }
        break;
      }
    }
  }

  async getSumOfPricesOfTheProductPresentInTheCart() {
    let sum = 0;
    await this.finalCartList.first().waitFor();
    const bool = await this.finalCartList.first().isVisible();
    expect(bool).toBeTruthy();

    await this.page.pause();

    const count = await this.finalCartList.count();
    console.log('Count is',count);
    for (let i = 0; i < count; i++) {
      let amount = await this.finalCartList.nth(i).textContent();
      console.log('Individual Amount is  ',amount);

      sum = parseFloat(sum)+ parseFloat(amount.replace(/[^\d.]/g,"").trim());
      console.log('Individual Sum is  ',sum);
    }

    console.log('Final Sum is  ',sum);

    return sum;
  }

  async getTotalTaxtOfTheProductPresentInTheCart() {
    let sum = 0;
    await this.finalTaxOnTheCart.first().waitFor();
    const bool = await this.finalTaxOnTheCart.first().isVisible();
    expect(bool).toBeTruthy();
    await this.page.pause();

    let taxValueOfTheCart = await this.finalTaxOnTheCart
      .first()
      .textContent();

    const finalTaxAmount = parseFloat(taxValueOfTheCart.replace(/[^\d.]/g,"").trim());

    console.log('Final Tax value of the cart is ',finalTaxAmount);

    return finalTaxAmount;
  }
}

module.exports = { CommonUtilityMethods };
