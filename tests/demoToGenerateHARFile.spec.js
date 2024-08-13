const { test, expect } = require("@playwright/test");

test("Generate HAR file",async({page}) => {

    await page.routeFromHAR("har/booksapi.har",{
        update: true
    });

    await page.goto("https://bookcart.azurewebsites.net/",{
        waitUntil:"domcontentloaded"
    });

    await page.waitForTimeout(5000);
})