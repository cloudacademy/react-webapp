const faker = require("faker");
const puppeteer = require("puppeteer");

const person = {
  name: faker.name.firstName() + " " + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

describe("Title Text", () => {
  test("title loads correctly", async () => {
    let browser = await puppeteer.launch({
      headless: true
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ""
    });

    await page.goto("http://localhost:9000/");
    await page.waitForSelector("title");
    //await page.screenshot({ path: "index.png" });

    const html = await page.$eval("title", e => e.innerHTML);
    expect(html).toBe("React App");

    browser.close();
  }, 16000);
});
