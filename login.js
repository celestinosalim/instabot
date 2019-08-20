const login = async (username, password, page, BASE_URL, randomWait) => {
  await page.goto(BASE_URL, { waitUntil: "networkidle2" });

  /* We can suse the page.$() method to access the Selectors API 
    method querySelector() on the document, and page.$$() as an alias 
    to querySelectorAll().
     */

  let loginButton = await page.$("._0mzm-.sqdOP.L3NKy");

  /* Click on the login url button*/
  await loginButton.click();

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.waitFor(randomWait(3000, 4000));

  await page.type('input[name="username"]', username, {
    delay: 100
  });
  await page.type('input[name="password"]', password, {
    delay: 100
  });

  let secondLoginButton = await page.$(
    ".Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB:nth-last-child(2)"
  );

  // debugger;

  await page.waitFor(randomWait(2000, 4000));

  /* Click on the login url button*/
  await secondLoginButton.click();

  /* Wait until instagram loads the modal.*/
  await page.waitFor(randomWait(3000, 5000));

  /* Finds the cancel button*/
  let firstModalBtn = await page.$("div.mt3GC button.aOOlW.HoLwm");

  await firstModalBtn.click();

  await page.waitFor(randomWait(3000, 5000));
  // debugger;
};

module.exports = login;
