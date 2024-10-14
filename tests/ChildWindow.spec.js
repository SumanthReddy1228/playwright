const {test} =require("@playwright/test");

test("child window handling", async ({browser})=>{
    const context= await browser.newContext();
    const page=await context.newPage({viewport:null});
    
    await page.goto("https://demoqa.com/");
    const [newPage]=await Promise.all([
        context.waitForEvent('page'),
        page.locator(".banner-image").click()
    ]);
    // await page.pause();
    const newPageText=await newPage.locator("a[class='btn btn-primary-shadow btn-block']").textContent();
    console.log("New page Text: "+newPageText);
})
