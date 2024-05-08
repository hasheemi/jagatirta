//module and constant
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const { google } = require("googleapis");
const app = express();
const port = 3012;

const db = require("./helpers/db");
//use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "12alvin44jawir788jomok",
    saveUninitialized: true,
    expires: new Date(Date.now() + 1000 * 3600),
    resave: true,
  })
);
app.use(function (req, res, next) {
  res.locals = req.session;
  next();
});

const authClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3012/auth/google/callback"
);
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
const authUrl = authClient.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});
//route
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login", { isLogin: req.session.isLogin });
});
app.get("/blog", (req, res) => {
  res.render("blog");
});
app.get("/dashboard", (req, res) => {
  if (req.session.isLogin == true) {
    res.render("dashboard", { name: req.session.name });
  } else {
    res.redirect("/login");
  }
});
app.get("/maps", (req, res) => {
  res.render("maps");
});
app.get("/auth/google", (req, res) => {
  res.redirect(authUrl);
});
app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await authClient.getToken(code);
  authClient.setCredentials(tokens);
  const oauth2 = google.oauth2({
    auth: authClient,
    version: "v2",
  });
  const { data } = await oauth2.userinfo.get();
  await db.query(
    `INSERT INTO user (name,email,profile) VALUES ("${data.given_name} ${data.family_name}","${data.email}","${data.picture}")`,
    function (err, resu, field) {
      if (err.errno == 1062 || !err) {
        req.session.isLogin = true;
        req.session.name = data.given_name;
        res.redirect("/dashboard");
      } else {
        res.status(500).send("errrooror");
      }
    }
  );
});
app.get("/auth/google/logout", (req, res) => {
  if (authClient.credentials.access_token !== undefined) {
    authClient.revokeCredentials();
  }
  req.session.destroy();
  res.redirect("/");
});
//start
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
