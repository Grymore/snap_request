require("dotenv").config();
const axios = require("axios");
const {
  generateSignature512,
  toLowercaseHex,
} = require("../middleware/generateSignature");
const { generateToken } = require("../middleware/generateToken");
const { randomInt } = require("crypto");

const shopeepayController = async (req, res) => {
  const token = await generateToken();

  const CLIENT_ID = process.env.CLIENT_ID;

  const dateTime = new Date().toISOString();
  const dateTimeFinal = dateTime.substring(0, 19) + "Z";

  const waktu = new Date(dateTime); // Buat salinan tanggal dan waktu saat ini
  waktu.setMinutes(waktu.getMinutes() + 60); // Tambahkan 60 menit ke salinan

  const tempExpired = waktu.toISOString();
  const dateTimeFinalexpired = tempExpired.substring(0, 19) + "Z";

  // const {  invoice, amount } = req.body;

  const shopeeUrl = "/direct-debit/core/v1/debit/payment-host-to-host";
  const body = {
    partnerReferenceNo: `INV${randomInt(99999)}`,
    pointOfInitiation: "app",
    urlParam: [
      {
        url: "https://google.com",
        type: "PAY_RETURN",
        isDeepLink: "N",
      },
    ],
    amount: {
      value: "200000.00",
      currency: "IDR",
    },
    additionalInfo: {
      channel: "EMONEY_SHOPEE_PAY_SNAP",
    },
  };

  const stringBody = JSON.stringify(body);
  const BodyMinify = toLowercaseHex(stringBody);
  const signature512 = generateSignature512(
    shopeeUrl,
    token,
    BodyMinify,
    dateTimeFinal
  );

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-PARTNER-ID": CLIENT_ID,
      "X-TIMESTAMP": dateTimeFinal,
      "X-SIGNATURE": signature512,
      "X-EXTERNAL-ID": randomInt(888, 99999),
      "X-DEVICE-ID": randomInt(777, 99999),
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(config.headers["X-SIGNATURE"]);

  try {
    const urlReq = `https://api-sandbox.doku.com${shopeeUrl}`;
    const response = await axios.post(urlReq, body, config);
    console.log(response.data);
    res.json({ "data doku": response.data, body: body });
  } catch (error) {
    res.status(500);
    res.json({
      "response token": token,
      "data doku": error.response.data,
      body: body,
      header: config,
    });
  }
};

module.exports = { shopeepayController };
