require("dotenv").config();
let getImages = require("./getImages");
let getQuotes = require("./getQuotes");

const postPhoto = async (page, randomWait) => {
  await getImages(process.env.IMAGE_API, "./image.jpg", () =>
    console.log("done")
  );
  let image = await "./image.jpg";
  let message, author;

  await getQuotes(process.env.QUOTES_API).then(data => {
    message = data.content;
    author = data.author;
  });

  let uploadButton = await page.$(
    "div.q02Nz._0TPg span.glyphsSpriteNew_post__outline__24__grey_9.u-__7"
  );

  if (uploadButton) {
    await uploadButton.click();
    await page.waitFor(randomWait(3500, 5000));

    const fileInput = await page.$("input[type=file]");
    await fileInput.uploadFile(image);
    await page.waitFor(randomWait(3000, 5000));

    let nextButton = await page.$(".UP43G");
    await nextButton.click();

    await page.waitFor(randomWait(2000, 3000));
    let textArea = await page.$("textarea._472V_");
    await textArea.click();

    await page.keyboard.type(`${message} \n by: ${author}`, {
      delay: 100
    });

    await page.waitFor(randomWait(2000, 3000));
    let shareButton = await page.$(".UP43G");
    await shareButton.click();

    await page.waitFor(randomWait(8000, 10000));

    let notification = await page.$(".aOOlW.HoLwm");
    if (notification) {
      await notification.click();
    } else {
      await page.waitFor(randomWait(3500, 5000));
    }
  } else {
    await page.waitFor(randomWait(5000, 8000));
  }
};

module.exports = postPhoto;
