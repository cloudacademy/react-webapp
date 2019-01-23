const puppeteer = require("puppeteer");

describe("Title Text", () => {
    test("title loads correctly", async () => {  
    (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.stuff.co.nz/");
    await page.screenshot({ path: "example.png" });

    await browser.close();
    })();
}, 16000);
});
