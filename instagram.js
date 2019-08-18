require("dotenv").config();
const puppeteer = require("puppeteer");
const device = require("puppeteer/DeviceDescriptors")["iPhone X"];
const BASE_URL = "https://instagram.com/";

//simulating randomly user action.
function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

const instagram = {
  initialize: async () => {
    instagram.browser = await puppeteer
      .launch({ args: ["--disable-web-security"], headless: false })
      .then(async browser => {
        instagram.page = await browser.newPage();
        await instagram.page.setUserAgent(process.env.USER_AGENT);

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

    /* Wait until instagram loads the modal.*/
    await instagram.page.waitFor(5000);

    /* Finds the cancel button*/
    let firstModalBtn = await instagram.page.$("div.mt3GC button.aOOlW.HoLwm");

    await firstModalBtn.click();

    let uploadButton = await instagram.page.$(
      "div.q02Nz._0TPg span.glyphsSpriteNew_post__outline__24__grey_9.u-__7"
    );
    await uploadButton.click();
    await instagram.page.waitFor(3000);

    const fileInput = await instagram.page.$("input[type=file]");
    await fileInput.uploadFile("./image1.jpg");
    await instagram.page.waitFor(5000);

    let nextButton = await instagram.page.$(".UP43G");
    await nextButton.click();

    await instagram.page.waitFor(5000);
    let textArea = await instagram.page.$("textarea._472V_");
    await textArea.click();
    await instagram.page.keyboard.type(`Posting From Node # 1`, {
      delay: 100
    });

    // debugger;
    await instagram.page.waitFor(5000);
    let shareButton = await instagram.page.$(".UP43G");
    await shareButton.click();

    // debugger;
  },
  post: async () => {
    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });
  }
};

module.exports = instagram;
