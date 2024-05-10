//module and constant
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const { google } = require("googleapis");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = 3012;

const db = require("./helpers/db");
const upload = require("./middlewares/upload");
const bucket = require("./helpers/bucket");
const storetext = require("./middlewares/storetext");
const getCoor = require("./middlewares/coordinat");
const proxy = createProxyMiddleware({
  router: (req) => new URL(req.path.substring(7)),
  pathRewrite: (path, req) => new URL(req.path.substring(7)).pathname,
  changeOrigin: true,
  logger: console,
});
//use
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
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
app.get("/blog", async (req, res) => {
  await db.query(`SELECT * FROM blog`, (err, resu, field) => {
    if (err) {
      res.redirect("/");
    } else {
      res.render("blog", { post: resu });
    }
  });
});
app.get("/maps", async (req, res) => {
  await db.query(`SELECT * FROM place`, (err, resu, field) => {
    if (err) {
      res.redirect("/");
    } else {
      console.log(resu);
      res.render("maps", { place: resu });
    }
  });
});
app.get("/blog/post/:slug&:id", async (req, res) => {
  await db.query(
    `SELECT * FROM blog WHERE slug = "${req.params.slug}" AND id = ${req.params.id}`,
    (err, resu, field) => {
      if (err || resu.length == 0) {
        res.redirect("/");
      } else {
        res.render("post", { data: resu });
      }
    }
  );
});
app.get("/maps/place/:id", async (req, res) => {
  await db.query(
    `SELECT * FROM place WHERE id = ${req.params.id}`,
    (err, resu, field) => {
      if (err || resu.length == 0) {
        res.redirect("/");
      } else {
        res.json(resu);
      }
    }
  );
});
app.get("/dashboard", (req, res) => {
  if (req.session.isLogin == true) {
    res.render("dashboard", { name: req.session.name });
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/add", (req, res) => {
  if (req.session.isLogin == true) {
    res.render("dashboard-add", {
      name: req.session.name,
      email: req.session.email,
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/write", (req, res) => {
  if (req.session.isLogin == true) {
    res.render("dashboard-write", {
      name: req.session.name,
      email: req.session.email,
    });
  } else {
    res.redirect("/login");
  }
});
// app.get("/maps", (req, res) => {
//   res.render("maps");
// });
app.post("/add/place", upload, getCoor, async (req, res) => {
  let data = req.body;
  await db.query(
    `INSERT INTO place (userId,nama,deskripsi,prov,kab,jenis,kondisi,notel,link,koordinat,img,timestamp,email) VALUES ("${data.username}","${data.title}","${data.deskripsi}","${data.provinsi}","${data.kabupaten}","${data.fungsi}","${data.lingkungan}","${data.notel}","${data.link}","${data.koordinat}","${data.img}","${data.date}","${data.email}")`,
    function (err, resu, field) {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/add");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
});
app.post("/add/blog", upload, storetext, async (req, res) => {
  let data = req.body;
  await db.query(
    `INSERT INTO blog (userId,judul,slug,isi,img,timestamp,email,cuplikan) VALUES ("${data.username}","${data.title}","${data.slug}","${data.url}","${data.img}","${data.date}","${data.email}","${data.cuplikan}")`,
    function (err, resu, field) {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/write");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
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
      if (err) {
        if (err.errno == 1062) {
          req.session.isLogin = true;
          req.session.name = data.given_name;
          req.session.email = data.email;
          res.redirect("/dashboard");
        } else {
          res.status(500).send("errrooror");
        }
      } else {
        req.session.isLogin = true;
        req.session.name = data.given_name;
        req.session.email = data.email;
        res.redirect("/dashboard");
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
app.get("/proxy/*", proxy, (req, res) => {
  res.send("hello");
});
app.get("/cdn/:file", (req, res) => {
  bucket.readObject(req.params.file, async (err, data) => {
    if (err) res.status(404).send("file not found");
    res.type(req.params.file.split(".")[1]);
    res.send(data.buffer);
  });
});
//start
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
