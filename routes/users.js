var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/halo", function (req, res) {
  // const data = {
  //   message: "Ini adalah contoh data dalam format JSON",
  //   timestamp: new Date(),
  // };

  const { grantType } = req.body;
  const { X_SIGNATURE: X_SIGNATURE, X_CLIENT_KEY: X_CLIENT_KEY } = req.headers;

  const data = {
    grantType,
  };

  console.log(req.headers);
  console.log(req.body);

  res.json({
    data: data,
    headers: req.headers,
  });
});
module.exports = router;
