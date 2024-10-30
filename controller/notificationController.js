const validasi = require("../middleware/generateToken");
const minify = require("../middleware/generateSignature");

const notificationController = async (req, res) => {
  const requestBody = req.body;
  const signature = req.headers["x-signature"];
  const timestamp = req.headers["x-timestamp"];
  const token = req.headers["authorization"];
  const bearerToken = token.split(" ")[1];

  const stringBody = JSON.stringify(requestBody);
  const BodyMinify = minify.toLowercaseHex(stringBody);

  // // // HTTPMethod + ”:“+ EndpointUrl +":"+ B2BAccessToken + ":“+ Lowercase(HexEncode(SHA-256(minify(RequestBody)))) + ":“ + X-TimeStamp
  const stringToSign = `POST:/doku/v1.1/transfer-va/payment:${bearerToken}:${BodyMinify}:${timestamp}`;

  const verifikasi = validasi.verifySignature(stringToSign);

  console.log(`ini component signature merchant : ${stringToSign}`);
  console.log(`ini signture doku : ${signature}`);
  console.log(verifikasi);

  if (verifikasi !== signature) {
    return res.status(400).json({
      message: "signature not valid",
    });
  }

  const headers = {
    "Content-Type": "application/json",
  };

  const responseData = {
    responseCode: "2002500",
    responseMessage: "Successful",
    virtualAccountData: {
      partnerServiceId: req.body["partnerServiceId"],
      customerNo: req.body["customerNo"],
      virtualAccountNo: req.body["virtualAccountNo"],
      virtualAccountName: req.body["virtualAccountName"],
      trxId: req.body["trxId"],
      paymentRequestId: req.body["paymentRequestId"],
    },
  };

  res.set(headers);
  res.json(responseData);
};

module.exports = { notificationController };
