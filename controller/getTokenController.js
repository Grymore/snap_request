require("dotenv").config();
const axios = require("axios");
const { generateSignatureToken } = require("../middleware/generateSignature");

const CLIENT_ID = process.env.CLIENT_ID;

const dateTime = new Date().toISOString();
const dateTimeFinal = dateTime.substring(0, 19) + "Z";

const getTokenController = async (req, res) => {
  const signature = generateSignatureToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CLIENT-KEY": CLIENT_ID,
      "X-TIMESTAMP": dateTimeFinal,
      "X-SIGNATURE": signature,
    },
  };

  const body = {
    grantType: "client_credentials",
  };

  const urlReq =
    "https://api-sandbox.doku.com/authorization/v1/access-token/b2b";
  const response = await axios.post(urlReq, body, config);
  console.log(response.data.accessToken);
  res.json(response.data);
};

module.exports = { getTokenController };
