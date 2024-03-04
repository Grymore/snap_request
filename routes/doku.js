var express = require("express");
var router = express.Router();

const { getTokenController } = require("../controller/getTokenController.js");
const {
  getVaNumberController,
} = require("../controller/getVaNumberController.js");
const {
  notificationController,
} = require("../controller/notificationController.js");

router.post("/gettoken", getTokenController);
// router.post("/getvanumber", getVaNumberController);
router.post("/v1/transfer-va/payment", notificationController);

module.exports = router;
