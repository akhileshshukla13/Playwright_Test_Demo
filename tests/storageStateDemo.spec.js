const { test, expect } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://parabank.parasoft.com/");
  await page.locator(".login [name='username']").fill("Test");
  await page.locator(".login [name='password']").fill("Testing123$");
  await page.locator(".login .button").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Client App login", async () => {
  const page = await webContext.newPage();
  await page.goto("https://parabank.parasoft.com/");
  const title = await page.locator("#topPanel [title='ParaBank']");
  await title.first().waitFor();
  await page.pause();
  const bool = await title.isVisible();
  expect(bool).toBeTruthy();
});
