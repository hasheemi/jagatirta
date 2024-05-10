const bucket = require("../helpers/bucket");
const sharp = require("sharp");

function upload(req, res, next) {
  if (!req.files) next();
  else {
    const file = req.files.photo;
    const type = file.name.split(".")[1];
    const name = `${req.body.slug}-${req.body.date}.${type}`;
    sharp(file.data)
      .webp({ quality: 20 })
      .toBuffer()
      .then((data) => {
        bucket.createObject(name, data, (err) => {
          if (err) {
            console.log(err);
            res.render("dashboard-add.ejs", {
              err: "failed to upload your image",
            });
          } else {
            req.body.img = `/cdn/${name}`;
            next();
          }
        });
      });
  }
}

module.exports = upload;
