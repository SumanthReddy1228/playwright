const { test, expect } = require("@playwright/test");
const { timeout } = require("../playwright.config");
const { log } = require("console");
const path = require("path");

test("first playwright test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("//input[@id='user-name']").fill("standard_user");
  // await page.locator("//input[@id='user-name']").fill("");// to clear the text in field
  // await page.pause();// get debugging window we can  check line by line execution
  await page.locator("//input[@id='password']").fill("secret_sauce");
  await page.locator("//input[@id='login-button']").click();
  // await page.locator("#login-button").filter({hasText:"Login"}).click();
  // await page.getByRole("button",{name:"Login"}).click() //we  can use getbyrole method inplace of locator
  // var errorMessage= await page.locator("h3[data-test='error']").allTextContents();
  // console.log(errorMessage);
  // var errorMessage= await page.locator("h3[data-test='error']").nth(0).allTextContents(); // the method returns array of all matching values of given locator so we can use nth value feature
  // var errorMessage= await page.locator("h3[data-test='error']").last().allTextContents();//get last value first()-get first value
  await expect(page.locator("h3[data-test='error']")).toContainText(
    "Username is required"
  );
  await page.waitForLoadState("networkidle"); // This can't be used for live pages. it is used to untill all the newrok packets are received and no further thing left to load from server.
});

test ("practice testcase", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    {
      waitUntil: "load",
      timeout: 60000,
    }
  );
  await page.waitForLoadState("networkidle", { timeout: 120000 });
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("password").fill("admin123");
  await page.locator("//button[normalize-space()='Login']").click();
  await page.locator(".oxd-main-menu-item").nth(0).click();
  await page.waitForLoadState("networkidle");

  // Dropdown
  await page.locator(".oxd-select-text-input").nth(0).click();
  await page.getByRole("option", { name: "Admin" }).click();

  // Checkbox
  await page.locator(".oxd-checkbox-input-icon").nth(2).check();
  const status = await page
    .locator(".oxd-checkbox-input-icon")
    .nth(2)
    .isChecked(); // returns true if it is checked
  console.log("Is checked: " + status);
  expect(page.locator(".oxd-checkbox-input-icon").nth(2)).toBeChecked();
  await page.pause();
});

test("screenshot_TC", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    {
      waitUntil: "load",
      timeout: 60000,
    }
  );

  await page.waitForLoadState("networkidle", { timeout: 120000 });
  await page.getByPlaceholder("Username").fill("Admin");
  await page.screenshot({path:"homepage_SC.png"});// used to take complete page screenshot
  await page.getByPlaceholder("password").fill("admin123");
  await page.locator("//button[normalize-space()='Login']").screenshot({path:"loginButton.png"});//used to take particular element screenshot
  await page.locator("//button[normalize-space()='Login']").click();

});


test.only("Compare two screenshots", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("https://demoqa.com/");

  // Take a screenshot of the current state
  const screenshot = await page.screenshot();

  // Load the expected screenshot
  const expectedScreenshot = await page.context().storageState();

  // Compare the screenshots
  expect(screenshot).toMatchSnapshot(expectedScreenshot);
});


