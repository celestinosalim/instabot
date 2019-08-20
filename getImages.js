require("dotenv").config();
const fs = require("fs");
const request = require("request");

const getImages = async (imageAPI, filename, callback) => {
  request.head(imageAPI, function(err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);
    console.log("headers", res.headers);
    let file;
    request(imageAPI)
      .pipe((file = fs.createWriteStream(filename)))
      .on("finish", () => {
        file.width = 100;
        file.height = 100;
        console.log(file);
      })
      .on("close", callback);
  });
};
// getImages(process.env.IMAGE_API, "./image.jpg", () => console.log("done"));
module.exports = getImages;
