require("dotenv").config();
const axios = require("axios");
const {
  generateSignature512,
  toLowercaseHex,
} = require("../middleware/generateSignature");
const { generateToken } = require("../middleware/generateToken");
const { randomInt } = require("crypto");

const getVaNumberController = async (req, res) => {
  const token = await generateToken();

  const CLIENT_ID = process.env.CLIENT_ID;

  const dateTime = new Date().toISOString();
  const dateTimeFinal = dateTime.substring(0, 19) + "Z";

  const waktu = new Date(dateTime); // Buat salinan tanggal dan waktu saat ini
  waktu.setMinutes(waktu.getMinutes() + 60); // Tambahkan 60 menit ke salinan

  const tempExpired = waktu.toISOString();
  const dateTimeFinalexpired = tempExpired.substring(0, 19) + "Z";

  const { name, email, invoice, amount, channel } = req.body;

  const urlRoute = {
    // btnUrl: "/virtual-accounts/bi-snap-va/v1/transfer-va/create-va",
    bncUrl: "/bi-snap-va/bnc/v1/transfer-va/create-va",
    danamonUrl: "/virtual-accounts/bi-snap-va/v1/transfer-va/create-va",
  };

  const binRoute = {
    btnBin: "77777",
    danamonBin: "   89226",
    bncBin: "90341537",
  };

  let selectedUrl;
  let selectedBin;

  if (channel === "BNC") {
    selectedUrl = urlRoute.bncUrl;
    selectedBin = binRoute.bncBin;
  }
  if (channel === "Danamon") {
    selectedUrl = urlRoute.danamonUrl;
    selectedBin = binRoute.danamonBin;
  } else {
    selectedUrl = urlRoute.danamonUrl;
    selectedBin = binRoute.danamonBin;
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
      channel: "VIRTUAL_ACCOUNT_BANK_DANAMON",
      virtualAccountConfig: {
        reusableStatus: false,
      },
    },
  };

  const stringBody = JSON.stringify(body);
  const BodyMinify = toLowercaseHex(stringBody);
  const EndpointUrl = selectedUrl;
  const signature512 = generateSignature512(EndpointUrl, token, BodyMinify);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-PARTNER-ID": CLIENT_ID,
      "X-TIMESTAMP": dateTimeFinal,
      "X-SIGNATURE": signature512,
      "X-EXTERNAL-ID": randomInt(888, 99999),
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(config.headers["X-SIGNATURE"]);

  try {
    const urlReq = `https://api-sandbox.doku.com${selectedUrl}`;
    const response = await axios.post(urlReq, body, config);
    console.log(response.data);
    res.json({ "data doku": response.data, body: body });
  } catch (error) {
    res.status(500);
    res.json({
      "data doku": error.response.data,
      body: body,
      header: config,
      request: selectedUrl,
    });
  }
};

module.exports = { getVaNumberController };
