const puppeteer = require("puppeteer");
const device = require("puppeteer/DeviceDescriptors")["iPhone X"];

const BASE_URL = "https://instagram.com/";

const instagram = {
  initialize: async () => {
    instagram.browser = await puppeteer
      .launch({ headless: false })
      .then(async browser => {
        instagram.page = await browser.newPage();
        await instagram.page.emulate(device);
      });
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    /* We can suse the page.$() method to access the Selectors API 
    method querySelector() on the document, and page.$$() as an alias 
    to querySelectorAll().
     */

    let loginButton = await instagram.page.$("._0mzm-.sqdOP.L3NKy");

    /* Click on the login url button*/
    await loginButton.click();

    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

    await instagram.page.waitFor(1000);

    await instagram.page.type('input[name="username"]', username, {
      delay: 100
    });
    await instagram.page.type('input[name="password"]', password, {
      delay: 100
    });

    let secondLoginButton = await instagram.page.$(
      ".Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB:nth-last-child(2)"
    );

    // debugger;

    await instagram.page.waitFor(1000);

    /* Click on the login url button*/
    await secondLoginButton.click();

    await instagram.page.waitFor(5000);

    let firstModalBtn = await instagram.page.$("div.mt3GC button.aOOlW.HoLwm");

    await firstModalBtn.click();

    debugger;
  }
};

module.exports = instagram;
