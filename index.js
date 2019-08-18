require("dotenv").config();
const puppeteer = require("puppeteer");
const device = require("puppeteer/DeviceDescriptors")["iPhone X"];
const login = require("./login");
const postPhoto = require("./postPhoto");

const BASE_URL = process.env.BASE_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
let page;

function randomWait(min, max) {
  return Math.random() * (max - min) + min;
}

(async () => {
  await puppeteer
    .launch({ args: ["--disable-web-security"], headless: false })
    .then(async browser => {
      page = await browser.newPage();
      await page.setUserAgent(process.env.USER_AGENT);
      await page.emulate(device);
    });

  await login(username, password, page, BASE_URL, randomWait);
  await postPhoto(page, randomWait);

  debugger;
})();
