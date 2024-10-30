const verifySignatureToken = (waktu, signature) => {
  const publicKey =`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3S0NsuvInYtuSpLZeJS1QiFjnlGr0djbJLhjJNxaW6b/Ab0RebOZ1AS1Izn6YJChPuTvLyU0GL76mfK8MiDILhz7/Li2OGiffpZUDMgSYW5BdD83QlcurTzpSbAsSHqxoyChzGVYhN3iHVLnu4158WR5QAdA27Q8ANxATsErz4d7xwowA8xpBsxnmmSqwBeya2baKsDOhnjna1/2jaZ5vq3O/kAYkmbdkr9ZBNIhRbf+NCeIdmxKVqgPa9sdVCtoq63PAUtse+sfeNg5VmcamnslX3XjdFCHiQGdRqy+4q6ShqYtJUwa5897wCJdLRZ3s79hOJuAYcAxlotl/qW5xQIDAQAB
-----END PUBLIC KEY-----`;

  try {
    // const publicKey = process.env.DOKU_PUBLICKEY;
    const StringToSign = `${CLIENT_ID}|${waktu}`;
    const verifier = crypto.createVerify("RSA-SHA256");
    console.log(publicKey)
    verifier.update(StringToSign);
    const isValid = verifier.verify(publicKey, signature, "base64");
    console.log("result verify signature token : "+isValid)
    return isValid
  } catch (error) {
    console.error("Error in verifySignatureToken:", error);
    return false;
  }
};