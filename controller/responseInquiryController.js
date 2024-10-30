const axios = require("axios");
const validasi = require("../middleware/generateToken");
const minify = require("../middleware/generateSignature");
const { randomInt } = require("crypto");

const responseInquiryController = async (req, res) => {
  const requestBody = req.body;

  const signature = req.headers["x-signature"];
  const timestamp = req.headers["x-timestamp"];
  const token = req.headers["authorization"];
  const bearerToken = token.split(" ")[1];

  const stringBody = JSON.stringify(requestBody);
  const BodyMinify = minify.toLowercaseHex(stringBody);

  let partnerServiceId = req.body["partnerServiceId"];
  let customerNo = req.body["customerNo"];
  let va = req.body["virtualAccountNo"];
  const va_num = va.trim();

  // if (signature === null) {
  //   return res.status(400).json({ error: "tidak ada signature" });
  // }

  // // // HTTPMethod + ”:“+ EndpointUrl +":"+ B2BAccessToken + ":“+ Lowercase(HexEncode(SHA-256(minify(RequestBody)))) + ":“ + X-TimeStamp
  const stringToSign = `POST:https://wild-streets-say.loca.lt/v1.1/transfer-va/inquiry:${bearerToken}:${BodyMinify}:${timestamp}`;

  const verifikasi = validasi.verifySignature(stringToSign);

  console.log(`ini component : ${stringToSign}`);
  console.log(`ini signture doku : ${signature}`);
  console.log(verifikasi);

  if (verifikasi !== signature) {
    return res.status(400).json({
      message: "signature not valid",
    });
  }

  const headers = {
    "Content-Type": "application/json",
    "X-PARTNER-ID": "CLIENT_ID",
    "X-TIMESTAMP": "dateTimeFinal",
    "X-SIGNATURE": "signature512",
    "X-EXTERNAL-ID": "2",
  };


  const responseData = {
    responseCode: "2002400",
    responseMessage: "Successful",
    virtualAccountData: {
      partnerServiceId: partnerServiceId,
      customerNo: customerNo,
      virtualAccountNo: va,
      virtualAccountName: "Toru Yamashita",
      virtualAccountTrxType: "O",
      additionalInfo: {
        virtualAccountConfig: {
          reusableStatus: true,
          minAmount: "1000.00",
          maxAmount: "238841000.00"
        },
        trxId: randomInt(99999999),
      },
      totalAmount: {
        value: "0.00",
        currency: "IDR",
      },
    },
    inquiryStatus: "00",
    inquiryReason: {
      english: "Success",
      indonesia: "Sukses",
    },
    inquiryRequestId: randomInt(99999999)

  };

  // 5. Send successful response with data
  console.log("========REQUEST HEADER DOKU=========");
  console.log(req.headers);
  console.log("========REQUEST BODY DOKU=========");
  console.log(req.body);
  console.log("==============================");

  console.log("========RESPONSE HEADER INQUIRY=========");
  console.log(headers);
  console.log("========RESPONSE BODY INQUIRY=========");
  console.log(responseData);
  console.log("=================");

  res.set(headers);
  res.json(responseData);
};

module.exports = { responseInquiryController };
