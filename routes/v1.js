var express = require("express");
var router = express.Router();

const {
  notificationController,
} = require("../controller/notificationController.js");

router.post("/transfer-va/payment", notificationController);

module.exports = router;
