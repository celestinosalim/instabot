require("dotenv").config();
const puppeteer = require("puppeteer");
const device = require("puppeteer/DeviceDescriptors")["iPhone X"];
const login = require("./login");
const postPhoto = require("./postPhoto");

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const BASE_URL = process.env.BASE_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
let page;

app.listen(port, function() {
  console.log("App listening on port " + port);
});

function randomWait(min, max) {
  return Math.random() * (max - min) + min;
}

// setInterval(() => {
(async () => {
  await puppeteer
    .launch({
      args: [
        "--disable-web-security",
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ],
      headless: false
    })
    .then(async browser => {
      page = await browser.newPage();
      await page.setUserAgent(process.env.USER_AGENT);
      await page.emulate(device);
      await login(username, password, page, BASE_URL, randomWait);
      await postPhoto(page, randomWait);
      await page.waitFor(10000);
      await page.close();
      await browser.close();
    });
  // debugger;
})();
// }, 60000 * 60 * 12);
