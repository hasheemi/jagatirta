const bucket = require("../helpers/bucket");

function storetext(req, res, next) {
  let str = req.body.main;
  let cuplikan = str.substring(0, 210);
  let name = `${req.body.slug}-${req.body.date}.txt`;
  bucket.createObject(name, Buffer.from(str), (err) => {
    if (err) {
      res.redirect("/dashboard");
    } else {
      req.body.cuplikan = cuplikan;
      req.body.url = `/cdn/${name}`;
      next();
    }
  });
}
module.exports = storetext;
