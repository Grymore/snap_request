const crypto = require("crypto");
const generate = require("../middleware/generateSignature");
const {
  generateToken,
  verifySignature,
} = require("../middleware/generateToken");

const notificationController = async (req, res) => {
  const requestBody = req.body;
  const reqHeader = req.headers["x-signature"];
  const reqTime = req.headers["x-timestamp"];

  const token = await generateToken();
  const stringBody = JSON.stringify(requestBody);
  const BodyMinify = generate.toLowercaseHex(stringBody);

  // const hasil = generate.generateSignature512(
  //   "/v1/transfer-va/payment",
  //   token,
  //   BodyMinify
  // );

  // if (hasil !== reqHeader) {
  //   res.json({ status: "Not Valid Signature" });
  // }

  // res.json({ status: "Notification received" });

  // HTTPMethod + ”:“+ EndpointUrl +":"+ B2BAccessToken + ":“+ Lowercase(HexEncode(SHA-256(minify(RequestBody)))) + ":“ + X-TimeStamp
  const stringToSign = `POST:/v1/transfer-va/payment:${token}:${BodyMinify}:${reqTime}`;
  const verifySig = verifySignature(stringToSign, reqHeader);

  if (verifySig !== true) {
    return res.status(400).json({
      message: "Signaturen not valid",
    });
  }

  res.json({ status: "Notification received" });
};

module.exports = { notificationController };

// POST /doku/getvanumber 200 426.707 ms - 713
// Body Request {
//   'accept-encoding': 'gzip',
//   'x-timestamp': '2024-03-03T03:08:35.976Z',
//   'x-signature': 'DMKSye83lG3n6nzbhRLqfzIn5+s3kbE0HOw66q2mbe8QXWVYrJEmNK7BvGB8AWOkMYuzuxFfWwEFwfo4Gu0SVQ==',
//   'x-real-ip': '147.139.130.145',
//   'x-partner-id': 'BRN-0243-1681371318846',
//   'x-forwarded-server': '5d04b56bed37',
//   'x-forwarded-proto': 'https',
//   'x-forwarded-port': '443',
//   'x-forwarded-host': 'hot-worms-talk.loca.lt',
//   'x-forwarded-for': '147.139.130.145',
//   'x-external-id': '240303100835893107118835714011236159',
//   'x-b3-traceid': '1c620f49b6e8ca35',
//   'x-b3-spanid': '16aff27ebc01a680',
//   'x-b3-sampled': '0',
//   'x-b3-parentspanid': 'd8efab262ba58015',
//   'content-type': 'application/json',
//   'channel-id': 'VA008',
//   'authorization-customer': '',
//   accept: 'text/plain, application/json, application/*+json, */*',
//   'content-length': '504',
//   'user-agent': 'Java/17.0.9',
//   host: 'hot-worms-talk.loca.lt',
//   connection: 'close'
// }
// Notification body: {
//   virtualAccountEmail: 'sathosi@gmail.com',
//   virtualAccountPhone: '0816291271826',
//   trxId: 'INV1709435304',
//   paymentRequestId: '7312771244',
//   hashedSourceAccountNo: '23026101',
//   paidAmount: { value: '10000.00', currency: 'IDR' },
//   cumulativePaymentAmount: { value: '10000.00', currency: 'IDR' },
//   totalAmount: { value: '10000.00', currency: 'IDR' },
//   trxDateTime: '2024-03-03T10:08:35+07:00',
//   partnerServiceId: '90341537',
//   customerNo: '00000214',
//   virtualAccountNo: '9034153700000214',
//   virtualAccountName: 'Bitcoin'
// }
