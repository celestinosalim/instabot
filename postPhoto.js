const postPhoto = async (page, randomWait) => {
  let uploadButton = await page.$(
    "div.q02Nz._0TPg span.glyphsSpriteNew_post__outline__24__grey_9.u-__7"
  );
  await uploadButton.click();
  await page.waitFor(randomWait(2000, 3500));

  const fileInput = await page.$("input[type=file]");
  await fileInput.uploadFile("./image1.jpg");
  await page.waitFor(randomWait(1000, 3000));

  let nextButton = await page.$(".UP43G");
  await nextButton.click();

  await page.waitFor(randomWait(1000, 3000));
  let textArea = await page.$("textarea._472V_");
  await textArea.click();
  await page.keyboard.type(`Posting From Node random facts `, {
    delay: 100
  });

  // debugger;
  await page.waitFor(randomWait(1000, 3000));
  let shareButton = await page.$(".UP43G");
  await shareButton.click();
};

module.exports = postPhoto;
