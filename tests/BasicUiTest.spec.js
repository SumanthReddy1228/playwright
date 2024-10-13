const {test, expect} =require('@playwright/test');

test('first playwright test', async ({page})=>{

    await page.goto('https://www.saucedemo.com/');
    // await page.locator("//input[@id='user-name']").fill("standard_user");
    // await page.pause();// get debugging window we can  check line by line execution
    await page.locator("//input[@id='password']").fill("secret_sauce");
    await page.locator("//input[@id='login-button']").click();
    // var errorMessage= await page.locator("h3[data-test='error']").allTextContents();
    // console.log(errorMessage);
    // var errorMessage= await page.locator("h3[data-test='error']").nth(0).allTextContents(); // the method returns array of all matching values of given locator so we can use nth value feature
    // var errorMessage= await page.locator("h3[data-test='error']").last().allTextContents();//get last value first()-get first value
    await expect(page.locator("h3[data-test='error']")).toContainText("Username is required");

});

