require("dotenv").config();
const axios = require("axios");
const { generateSignatureToken } = require("./generateSignature");
const crypto = require("crypto");

const CLIENT_ID = process.env.CLIENT_ID;
const sharedkey = process.env.API_KEY;
const dateTime = new Date().toISOString();
const dateTimeFinal = dateTime.substring(0, 19) + "Z";

const generateToken = async (req, res) => {
  try {
    const signature = generateSignatureToken();
    console.log(`ini signature token : ${signature}`);
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
    // console.log(`request : ${config}`);
    console.log(response.data);
    return response.data.accessToken;
    // res.json(response.data);
  } catch (error) {
    return error.response.data;
    // res.json(error.response.data);
  }
};

const verifySignatureToken = (waktu, signature) => {
  try {
    const publicKey = process.env.DOKU_PUBLICKEY;
    // StringToSign = client_ID+"|"+X-TIMESTAMP
    const StringToSign = `${CLIENT_ID}|${waktu}`;
    const verifier = crypto.createVerify("SHA256");
    verifier.update(StringToSign);
    return verifier.verify(publicKey, signature, "base64");
  } catch (error) {
    console.error("Error in verifySignatureToken:", error);
    return false;
  }
};

const createSignature = (StringToSign) => {
  const hmac = crypto.createHmac("sha512", sharedkey);
  hmac.update(StringToSign);

  const signature = hmac.digest("base64");

  return signature;
};

const verifySignature = (stringToSign) => {
  const generatedSignature = createSignature(sharedkey, stringToSign);
  console.log(`ini ekspektasi : ${generatedSignature}`);
  return generatedSignature;
};

module.exports = {
  generateToken,
  verifySignatureToken,
  verifySignature,
};
