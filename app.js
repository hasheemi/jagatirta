//module and constant
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3012;

//use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//route
app.get("/", (req, res) => {
  res.send("Selamat datang di jagatirta");
});
app.get("/halo/:name", (req, res) => {
  res.render("index", { name: req.params.name });
});
app.get("/login", (req, res) => {
  res.send("login page ....");
});
app.get("/blog", (req, res) => {
  res.send("blog page ....");
});
app.get("/search", (req, res) => {
  res.send("search page ....");
});

//start
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
