const crypto = require("crypto");
require("dotenv").config();

const generateSignature = () => {
  const privateKey = process.env.PRIVATE_KEY;
  const clientId = process.env.CLIENT_ID;
  const dateTime = new Date().toISOString();
  const dateTimeFinal = dateTime.substring(0, 19) + "Z";
  const StringToSign = `${clientId}|${dateTimeFinal}`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(StringToSign);

  const signature = sign.sign(privateKey, "base64");

  return signature;
};

const generateSignature512 = (EndpointUrl, AccessToken, BodyMinify) => {
  const clientId = process.env.CLIENT_ID;
  const sharedkey = process.env.API_KEY;

  const dateTime = new Date().toISOString();
  const dateTimeFinal = dateTime.substring(0, 19) + "Z";

  // HTTPMethod +”:“+ EndpointUrl +":"+ AccessToken +":“+ Lowercase(HexEncode(SHA256(minify(RequestBody))))+ ":“ + TimeStamp
  const StringToSign = `POST:${EndpointUrl}:${AccessToken}:${BodyMinify}:${dateTimeFinal}`;

  const hmac = crypto.createHmac("sha512", sharedkey);
  hmac.update(StringToSign);

  const signature = hmac.digest("base64");

  return signature;
};

const toLowercaseHex = (input) => {
  return crypto.createHash("sha256").update(input).digest("hex").toLowerCase();
};

module.exports = { generateSignature, generateSignature512, toLowercaseHex };
