const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  name: String,
  url: String,
  description: String,
  categories: [String],
  price: [String],
});

module.exports = mongoose.model("site", siteSchema);
