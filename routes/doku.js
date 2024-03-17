var express = require("express");
var router = express.Router();

const { getTokenController } = require("../controller/getTokenController.js");
const {
  getVaNumberController,
} = require("../controller/getVaNumberController.js");
const {
  notificationController,
} = require("../controller/notificationController.js");
const {
  responseInquiryController,
} = require("../controller/responseInquiryController.js");
const {
  responseTokenController,
} = require("../controller/responseTokenController.js");

router.post("/gettoken", getTokenController);
router.post("/getvanumber", getVaNumberController);
router.post("/inquiryRequest", responseInquiryController);
router.post("/tokenRequest", responseTokenController);
router.post("/v1/transfer-va/payment", notificationController);

module.exports = router;
