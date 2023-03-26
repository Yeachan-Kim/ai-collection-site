const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const Category = require("./model/category");
const Site = require("./model/site");
mongoose.connect("mongodb://127.0.0.1:27017/test");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const categories = await Category.find({});
  const sites = await Site.find({});
  res.render("home.ejs", { categories, sites });
});

app.listen(PORT, () => {
  console.log(` ${PORT} 포트에서 서버 열림`);
});
