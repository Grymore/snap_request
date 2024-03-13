require("dotenv").config();
const axios = require("axios");
const generate = require("../middleware/generateSignature");
const { generateToken } = require("../middleware/generateToken");
const { randomInt } = require("crypto");

const getVaNumberController = async (req, res) => {
  try {
    const token = await generateToken();

    const CLIENT_ID = process.env.CLIENT_ID;

    const dateTime = new Date().toISOString();
    const dateTimeFinal = dateTime.substring(0, 19) + "Z";

    const waktu = new Date(dateTime); // Buat salinan tanggal dan waktu saat ini
    waktu.setMinutes(waktu.getMinutes() + 60); // Tambahkan 60 menit ke salinan

    // Mengonversi menjadi format ISO8601

    const tempExpired = waktu.toISOString();
    const dateTimeFinalexpired = tempExpired.substring(0, 19) + "Z";

    const { name, email, invoice, amount, channel } = req.body;

    const urlRoute = {
      btnUrl: "/virtual-accounts/bi-snap-va/v1/transfer-va/create-va",
      // bncUrl: "/bi-snap-va/bnc/v1/transfer-va/create-va",
      bncUrl: "/virtual-accounts/bi-snap-va/v1/transfer-va/create-va",
    };

    const binRoute = {
      btnBin: "77777",
      bncBin: "   89226",
    };

    let selectedUrl;
    let selectedBin;

    if (channel === "BNC") {
      selectedUrl = urlRoute.bncUrl;
      selectedBin = binRoute.bncBin;
    } else {
      selectedUrl = urlRoute.btnUrl;
      selectedBin = binRoute.btnBin;
    }

    const body = {
      trxId: invoice,
      virtualAccountTrxType: "1",
      expiredDate: dateTimeFinalexpired,
      partnerServiceId: selectedBin,
      virtualAccountName: name,
      virtualAccountEmail: email,
      virtualAccountPhone: "0816291271826",
      totalAmount: {
        value: amount,
        currency: "IDR",
      },
      additionalInfo: {
        id: "halo yu",
        en: "lest go",
        channel: "VIRTUAL_ACCOUNT_BANK_DANAMON",
      },
    };

    const stringBody = JSON.stringify(body);
    const EndpointUrl = selectedUrl;
    const BodyMinify = generate.toLowercaseHex(stringBody);
    const signature512 = generate.generateSignature512(
      EndpointUrl,
      token.accessToken,
      BodyMinify
    );

    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-PARTNER-ID": CLIENT_ID,
        "X-TIMESTAMP": dateTimeFinal,
        "X-SIGNATURE": signature512,
        "X-EXTERNAL-ID": randomInt(888, 99999),
        Authorization: `Bearer ${token.accessToken}`,
      },
    };

    try {
      const urlReq = `https://api-sandbox.doku.com${selectedUrl}`;
      const response = await axios.post(urlReq, body, config);
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500);
      res.json(error);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getVaNumberController };
