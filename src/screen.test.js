const puppeteer = require("puppeteer");

describe("Title Text", () => {
    test("title loads correctly", async () => {  
    (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:9000/index.html");
    await page.screenshot({ path: "example.png" });

    await browser.close();
    })();
}, 16000);
});
