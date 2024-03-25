const axios = require("axios");
const validasi = require("../middleware/generateToken");
const minify = require("../middleware/generateSignature");
const { randomInt } = require("crypto");

const responseInquiryController = async (req, res) => {
  const requestBody = req.body;

  const signature = req.headers["x-signature"];
  const timestamp = req.headers["x-timestamp"];
  const token = req.headers["authorization"];
  // const bearerToken = token.split(" ")[1];

  const stringBody = JSON.stringify(requestBody);
  const BodyMinify = minify.toLowercaseHex(stringBody);

  // if (signature === null) {
  //   return res.status(400).json({ error: "tidak ada signature" });
  // }

  // // // HTTPMethod + ”:“+ EndpointUrl +":"+ B2BAccessToken + ":“+ Lowercase(HexEncode(SHA-256(minify(RequestBody)))) + ":“ + X-TimeStamp
  // const stringToSign = `POST:https://yummy-laws-eat.loca.lt/doku/inquiryRequest:${bearerToken}:${BodyMinify}:${timestamp}`;

  // const verifikasi = validasi.verifySignature(stringToSign);

  // console.log(`ini component : ${stringToSign}`);
  // console.log(`ini signture doku : ${signature}`);
  // console.log(verifikasi);

  // if (verifikasi !== signature) {
  //   return res.status(400).json({
  //     message: "signature not valid",
  //   });
  // }

  const headers = {
    "Content-Type": "application/json",
    "X-PARTNER-ID": "CLIENT_ID",
    "X-TIMESTAMP": "dateTimeFinal",
    "X-SIGNATURE": "signature512",
    "X-EXTERNAL-ID": "2",
  };

  // const responseData = {
  //   responseCode: "2002400",
  //   responseMessage: "Successful",
  //   virtualAccountData: {
  //     partnerServiceId: "    8922",
  //     customerNo: "323423820345",
  //     virtualAccountNo: "    8922323423820345",
  //     virtualAccountName: "Toru Yamashita",
  //     virtualAccountEmail: "toru@oor.com",
  //     virtualAccountPhone: "081293912081",
  //     trxId: "23213439829713",
  //     additionalInfo: {
  //       virtualAccountConfig: {
  //         reusableStatus: true,
  //       },
  //     },
  //     totalAmount: {
  //       value: "0.00",
  //       currency: "IDR",
  //     },
  //   },
  //   virtualAccountTrxType: "2",
  //   billDetails: [
  //     {
  //       billName: "A bill for Toru",
  //       billShortName: "Bill T",
  //     },
  //   ],
  //   inquiryStatus: "SUCCESS",
  //   inquiryReason: {
  //     english: "Success",
  //     indonesia: "Sukses",
  //   },
  //   inquiryRequestId: "2303223201",
  // };

  const responseData = {
    responseCode: "2002400",
    responseMessage: "Successful",
    virtualAccountData: {
      partnerServiceId: "    8922",
      customerNo: "8922323623820354",
      virtualAccountNo: "    8922323623820354",
      virtualAccountName: "Toru Yamashita",
      virtualAccountEmail: "",
      virtualAccountPhone: "",
      trxId: randomInt(99999999),
      virtualAccountTrxType: "2",
      additionalInfo: {
        virtualAccountConfig: {
          reusableStatus: true,
        },
      },
      totalAmount: {
        value: "0.00",
        currency: "IDR",
      },
    },
    billDetails: [
      {
        billCode: "01",
        billNo: "REFINFO-0adq",
        billName: "MOHAMMAD REZA RIZAL",
        billShortName: "MOHAMMAD",
        billDescription: {
          english: "PEMBAYARAN PREMI POLIS",
          indonesia: "PAYMENT PREMIUM POLICY",
        },
        billSubCompany: "00001",
        billAmount: {
          value: "29143512",
          currency: "IDR",
        },
        additionalInfo: {
          id: "",
          en: "",
        },
      },
    ],
    freeTexts: [
      {
        english: "POLIS NO.010224000025",
        indonesia: "POLIS NO.010224000025",
      },
    ],
    feeAmount: {
      value: "0",
      currency: "IDR",
    },
    inquiryStatus: "SUCCESS",
    inquiryReason: {
      english: "Success",
      indonesia: "Sukses",
    },
    inquiryRequestId: `RequestID${randomInt(99999999)}`,
    subCompany: "",

    virtualAccountTrxType: "2",
    additionalInfo: {
      virtualAccountConfig: {
        reusableStatus: true,
      },
    },
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
