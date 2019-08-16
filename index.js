const ig = require("./instagram");

(async () => {
  await ig.initialize();
  await ig.login("tweefacts", "A.1234567s");
  debugger;
})();
