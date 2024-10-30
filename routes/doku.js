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

const {
  shopeepayController,
} = require("../controller/shopeepayController.js");

const { generateToken } = require("../middleware/generateToken.js");

// router.post("/gettoken", getTokenController);
router.post("/getvanumber", getVaNumberController);
router.post("/v1.1/transfer-va/inquiry", responseInquiryController);
router.post("/v1.1/transfer-va/payment", notificationController);
router.post("/tokenRequest", responseTokenController);
router.post("/test", generateToken);
router.post("/shopeepay", shopeepayController);

module.exports = router;
