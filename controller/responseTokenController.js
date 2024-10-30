const jwt = require("jsonwebtoken");
const validasi = require("../middleware/generateToken");

const responseTokenController = async (req, res) => {
  // Check Body Request
  const { grantType } = req.body;

  if (
    grantType !== "client_credentials" ||
    req.headers["x-signature"] === null
  ) {
    return res.status(400).json({ error: "unsupported_grant_type" });
  }

  // Validasi Signature public key DOKU
  const signature = req.headers["x-signature"];
  const timestamp = req.headers["x-timestamp"];
  const verify = validasi.verifySignatureToken(timestamp, signature);

  console.log("ini response verify : " + verify);

  if (verify !== true) {
    return res.status(400).json({
      message: "not valid",
    });
  }

  // Generate token
  function generateAccessToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
    };

    // Buat token menggunakan JWT
    const accessToken = jwt.sign(payload, "your_secret_key", {
      expiresIn: "1h",
    });

    return accessToken;
  }

  const pass = "123";
  const token = generateAccessToken(pass);

  // Set token expiration time (in seconds)
  const expiresIn = 10;
  const response = {
    responseCode: "2007300",
    responseMessage: "Successful",
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: expiresIn,
  };

  // const response = {
  //   responseCode: "4007301",
  //   responseMessage: "Invalid Field Format Timestamp",
  // };

  const headers = {
    "Content-Type": "application/json",
    "X-PARTNER-ID": "CLIENT_ID",
    "X-TIMESTAMP": "dateTimeFinal",
  };

  console.log("========REQUEST HEADER DOKU=========");
  console.log(req.headers);
  console.log("========REQUEST BODY DOKU=========");
  console.log(req.body);
  console.log("==============================");

  console.log("========RESPONSE HEADER TOKEN=========");
  console.log(headers);
  console.log("========RESPONSE BODY TOKEN=========");
  console.log(response);
  console.log("=================");

  // Respond with token
  res.json(response);
  res.status(200);
};

module.exports = { responseTokenController };
