const puppeteer = require("puppeteer");

const BASE_URL = "https://instagram.com/";

const instagram = {
  initialize: async () => {
    instagram.browser = await puppeteer.launch({ headless: false });
    instagram.page = await instagram.browser.newPage();
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    /* We can suse the page.$() method to access the Selectors API 
    method querySelector() on the document, and page.$$() as an alias 
    to querySelectorAll().
     */

    let loginButton = await instagram.page.$(".izU2O a");

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

    let secondLoginButton = await instagram.page.$("button._0mzm-.sqdOP.L3NKy");

    /* Click on the login url button*/
    await secondLoginButton.click();

    debugger;
  }
};

module.exports = instagram;
