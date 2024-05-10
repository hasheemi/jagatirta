const ceph = require("ceph/s3");
require("dotenv").config();

const bucket = new ceph.Connection({
  endPoint: "https://is3.cloudhost.id/",
  accessKey: "BM63833ZH5UBHEY5T5FW",
  secretAccessKey: "32Rbk8sRK2b7utYVC5HIWJcdKDUodctAQ3UyWWCF",
  bucket: "jagatirta",
});

module.exports = bucket;
