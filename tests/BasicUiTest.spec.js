const {test, expect} =require('@playwright/test');
const { timeout } = require('../playwright.config');

test('first playwright test', async ({page})=>{

    await page.goto('https://www.saucedemo.com/');
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
    await expect(page.locator("h3[data-test='error']")).toContainText("Username is required");
    await page.waitForLoadState('networkidle') // This can't be used for live pages. it is used to untill all the newrok packets are received and no further thing left to load from server.

});

test.only("dropdown testcase",async ({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForLoadState("networkidle",{timeout:60000});
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("password").fill("admin123");
}); 