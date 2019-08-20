require("dotenv").config();
const axios = require("axios");

const getQuotes = async quoteAPI => {
  let data;
  await axios.get(quoteAPI).then(res => (data = res.data));
  return data;
};

module.exports = getQuotes;
