const categoryList = require("./categoryList");
const siteList = require("./siteList");
const Category = require("../model/category");
const Site = require("../model/site");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test").catch((error) => {
  console.log(error);
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("데이터 베이스 연결 성공");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async function () {
  await Site.deleteMany({});
  for (const name of categoryList) {
    const category = new Category({
      name: name,
    });
    await category.save();
  }
  for (const site of siteList) {
    const siteModel = new Site({
      name: site.name,
      url: site.url,
    });
    await siteModel.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
