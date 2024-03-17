require("dotenv").config();
const axios = require("axios");
const { generateSignature } = require("./generateSignature");
const crypto = require("crypto");

const CLIENT_ID = process.env.CLIENT_ID;
const sharedkey = process.env.API_KEY;
const dateTime = new Date().toISOString();
const dateTimeFinal = dateTime.substring(0, 19) + "Z";

const generateToken = async (req, res) => {
  const signature = generateSignature();

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
  console.log(response.data);

  return response.data;
  // res.json(response.data);
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

const createSignature = (stringToSign) => {
  return crypto
    .createHmac("sha512", sharedkey)
    .update(stringToSign)
    .digest("hex");
};

// Fungsi untuk memverifikasi tanda tangan
const verifySignature = (stringToSign, receivedSignature) => {
  const generatedSignature = createSignature(sharedkey, stringToSign);
  return generatedSignature === receivedSignature;
};

module.exports = {
  generateToken,
  verifySignatureToken,
  verifySignature,
};
