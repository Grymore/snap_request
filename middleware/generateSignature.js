require("dotenv").config();
const crypto = require("crypto");

const privateKey = process.env.PRIVATE_KEY;
const clientId = process.env.CLIENT_ID;
const sharedkey = process.env.API_KEY;
const dateTime = new Date().toISOString();
const dateTimeFinal = dateTime.substring(0, 19) + "Z";

const generateSignatureToken = () => {
  const StringToSign = `${clientId}|${dateTimeFinal}`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(StringToSign);

  const signature = sign.sign(privateKey, "base64");

  return signature;
};



const generateSignature512 = (EndpointUrl, AccessToken, BodyMinify, TimeStamp) => {
  // HTTPMethod +”:“+ EndpointUrl +":"+ AccessToken +":“+ Lowercase(HexEncode(SHA256(minify(RequestBody))))+ ":“ + TimeStamp
  const StringToSign = `POST:${EndpointUrl}:${AccessToken}:${BodyMinify}:${TimeStamp}`;
  console.log(`ini string to sign : ` + StringToSign)
  const hmac = crypto.createHmac("sha512", sharedkey);
  hmac.update(StringToSign);

  const signature512 = hmac.digest("base64");

  console.log(`ini signature512 : ${signature512}`);
  return signature512;
};

const toLowercaseHex = (input) => {
  return crypto.createHash("sha256").update(input).digest("hex").toLowerCase();
};

module.exports = {
  generateSignatureToken,
  generateSignature512,
  toLowercaseHex,
};
