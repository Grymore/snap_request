const axios = require("axios");

const responseInquiryController = async (req, res) => {
  const { partnerServiceId } = req.body;

  // if(partnerServiceId !== "90341537" )
  //   {
  //     return res.status(400).json({ error: 'unsupported_grant_type' });
  //   }

  const headers = {
    "Content-Type": "application/json",
    "X-PARTNER-ID": "CLIENT_ID",
    "X-TIMESTAMP": "dateTimeFinal",
    "X-SIGNATURE": "signature512",
    "X-EXTERNAL-ID": "2",
  };

  const responseData = {
    responseCode: "2007300",
    responseMessage: "Successful",
    virtualAccountData: {
      partnerServiceId: "    8922",
      customerNo: "323423820343",
      virtualAccountNo: "    8922323423820343",
      virtualAccountName: "Toru Yamashita",
      virtualAccountEmail: "toru@oor.com",
      virtualAccountPhone: "081293912081",
      trxId: "23219829713",
      totalAmount: {
        value: "11500.00",
        currency: "IDR",
      },
    },
    inquiryStatus: "SUCCESS",
    inquiryReason: {
      english: "Success",
      indonesia: "Sukses",
    },
    expiredDate: "2024-03-31T23:59:59-07:00",
    additionalInfo: {
      deviceId: "12345679237",
      channel: "mobilephone",
    },
    inquiryRequestId: "23032201",
  };

  // 5. Send successful response with data
  console.log("========REQUEST HEADER DOKU=========");
  console.log(req.headers);
  console.log("========REQUEST BODY DOKU=========");
  console.log(req.body);
  console.log("==============================");

  console.log("========RESPONSE HEADER INQUIRY=========");
  console.log(headers);
  console.log("========RESPONSE BODY INQUIRY=========");
  console.log(responseData);
  console.log("=================");

  res.set(headers);
  res.json(responseData);
};

module.exports = { responseInquiryController };
