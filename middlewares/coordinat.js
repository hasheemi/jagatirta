var request = require("request");

function getCoor(req, res, next) {
  request(
    { url: req.body.link, followRedirect: false },
    function (error, response, body) {
      if (response.statusCode >= 300 && response.statusCode < 400) {
        let raw = response.headers.location.split("/")[6].split(",");
        let coor = `${raw[0].substring(1)},${raw[1]}`;
        req.body.koordinat = coor;
        next();
      } else {
        res.redirect("/dashboard");
      }
    }
  );
}

module.exports = getCoor;
