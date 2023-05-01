const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const Category = require("./model/category");
const Site = require("./model/site");
const methodOverride = require("method-override");
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const categories = await Category.find({});
  const sites = await Site.find({});
  res.render("home.ejs", { categories, sites });
});
app.get("/report", async (req, res) => {
  const categories = await Category.find({});
  const sites = await Site.find({});
  res.render("report.ejs", { categories, sites });
});
app.get("/admin", async (req, res) => {
  const categories = await Category.find({});
  const sites = await Site.find({});
  res.render("admin.ejs", { categories, sites });
});

app.get("/sites/new", async (req, res) => {
  const categories = await Category.find({});
  res.render("new.ejs", { categories });
});

app.get("/sites/:id", async (req, res) => {
  const { id } = req.params;
  const CurrentSite = await Site.find({ _id: id });
  const categories = await Category.find({});
  const sites = await Site.find({});
  console.log(CurrentSite);
  res.render("siteInfo.ejs", { categories, sites, CurrentSite });
});

app.get("/sites/:id/edit", async (req, res) => {
  const { id } = req.params;
  const CurrentSite = await Site.find({ _id: id });
  const categories = await Category.find({});
  res.render("edit.ejs", { CurrentSite, categories });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.redirect(302, "/admin");
});

app.post("/sites", async (req, res) => {
  const site = new Site(req.body.site);
  await site.save();
  res.redirect(`/sites/${site._id}`);
});

app.patch("/sites/:id", async (req, res) => {
  const { id } = req.params;
  const site = await Site.findByIdAndUpdate(id, { ...req.body.site });
  console.log({ ...req.body.site });
  res.redirect(`/sites/${site._id}`);
});

app.delete("/sites/:id", async (req, res) => {
  const { id } = req.params;
  await Site.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(` ${PORT} 포트에서 서버 열림`);
});
