require("dotenv").config();
const axios = require("axios");
const { generateSignatureToken } = require("./generateSignature");
const crypto = require("crypto");

const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_ID = "BRN-0255-1648461011109";
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
  //   const publicKey =`-----BEGIN PUBLIC KEY-----
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3S0NsuvInYtuSpLZeJS1QiFjnlGr0djbJLhjJNxaW6b/Ab0RebOZ1AS1Izn6YJChPuTvLyU0GL76mfK8MiDILhz7/Li2OGiffpZUDMgSYW5BdD83QlcurTzpSbAsSHqxoyChzGVYhN3iHVLnu4158WR5QAdA27Q8ANxATsErz4d7xwowA8xpBsxnmmSqwBeya2baKsDOhnjna1/2jaZ5vq3O/kAYkmbdkr9ZBNIhRbf+NCeIdmxKVqgPa9sdVCtoq63PAUtse+sfeNg5VmcamnslX3XjdFCHiQGdRqy+4q6ShqYtJUwa5897wCJdLRZ3s79hOJuAYcAxlotl/qW5xQIDAQAB
  // -----END PUBLIC KEY-----`;

  // const publicKey = `-----BEGIN PUBLIC KEY-----
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lD5LUdniNeY9FguPdPne8x4fFt7K7B0weMH5k8kbJn+JtdrZEGZQbMKLtIu6rGf+ZYWVlNtjkcKsEvL0UUnRRxKIWWSmtcKlqFwUlnEbuQbpa6kzcI6bxvhZ6ISnYClfX3HSWBHz+78ZAa2BnMatWIYa0ulFfD46faazusELMzezsafFp801Lgxwa8sqSldUXLu+nvM/9BFkZi+QT0XHi7GhmDxoajldQ7h8ooaWmPsE2/TIv4V1m2quLhXBOUSeeisQL60ebcUUMamyRyebubQa1BjjHzo2MU3AVZPxDTBJ1a4MnqR8rsdPBulr3qAgzfF/0v52OYt8kSXwukaZQIDAQAB
  // -----END PUBLIC KEY-----`;

  try {
    const publicKey = process.env.DOKU_PUBLICKEY;
    const StringToSign = `${CLIENT_ID}|${waktu}`;
    const verifier = crypto.createVerify("RSA-SHA256");
    console.log(publicKey);
    verifier.update(StringToSign);
    const isValid = verifier.verify(publicKey, signature, "base64");
    console.log("result verify signature token : " + isValid);
    return isValid;
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
  const generatedSignature = createSignature(stringToSign);
  console.log(`ini ekspektasi : ${generatedSignature}`);
  return generatedSignature;
};

module.exports = {
  generateToken,
  verifySignatureToken,
  verifySignature,
};
