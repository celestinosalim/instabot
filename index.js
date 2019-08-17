require("dotenv").config();
const ig = require("./instagram");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

(async () => {
  await ig.initialize();
  await ig.login("tweefacts", "A.1234567s");
  debugger;
})();
