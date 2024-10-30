const crypto = require('crypto');
const fs = require('fs');

//-- component signature --
// const privateKey = fs.readFileSync('publickey-DOKU.pem', 'utf8');
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDBsJ93+g/tZVmE
dNztq6Mvv3Do8gPxwfvnRzjcq1vYX0LeeYXMmxkktB+uCdWPVjBFsHbfJLF4xPS6
1/AOYx5g6ls2IhPh8GtLWQk67s/6HJwNHZP6W8CYQ3oxcvmDjYPAX2k108/qGYdD
6FqO1pdYc49p7gtSZuJBoQk7uTg5oaiJVGqG0p6V16QjRhRnopRrvV7O2B9FJatk
ywv+rBUcbTANU44St/6OtG3u4TTlrnhCDzstGBq8o5woJ3usev3Bq3egWu2pvZ5x
IxxCNbHaa6hYoa17NbhNNWYjdHMCg8TYf/bmLXm1jmSelIRWgJzbUbwcabXkr8Mq
ZXlKcyHBAgMBAAECggEAfVPx+8n8oFmiEMklY0xaLT0srC5dSwOAIei97Fuc9Ga/
eAEeCISbQlqi3RRT8YmNdqp2YHD3vPOEf5nWJRkRwRgjqOVoBBxy8LBN/qokPOxi
NUJcS/Uuq9eNq41/0hWxmLqj80Z5FDssgU5Jun80MvGjbKGxBcK4yEqRFOoGbZMC
HXMKdwYc21o0+JpTrE/hRbafMwICxtI+EWh00iBDADk/biDWnJxql80yLlRmVDX4
EY00cnPAD5KkA5UgK6p+CY5qBfEGEMlxLIopdHl4FXDSqPtMURWS4eqEiKXljG/h
CUIamtbCAKzao564ap/XO6h7xQjFzz7h94ta6s7VGQKBgQDtaNqAcn+Aik+HfuUc
uj3lbW7V0x8emdVT6ZvsmvAupmYDtqkW0R9WM7hZYC7joGluXQpnhi3B71S7IYrl
2fhH1GzPs/+72dKc5Hyc3aKWCR1v8dRGHOH8riqi21wRMqT5LV7krhiY/TXnSwVM
pCJofWvpZ7AYONjmtrrsf+1YhwKBgQDQ21vpXdzLkoi5xvlu7Q+aLkCYsYi+vc4A
BV147+p5WPcIXMw4OPH/CBl9+e6lZZn2vIcgd6U7yvYp2nmlL/tOINhkyn69XKQD
Nzhu6IkJKHwWgv6uWQoYX/8YywVBjIOkUC7GlVTBSI/EcziA6n9S4VWeFE9NI55x
+IF/EwbtdwKBgEkf1L1fhvo2n8xiP3ubudji3hKqVpl8VILmH4q/Jl+YDS/zoR1Q
CFDq2UteHtMp44+ExOGiKJHlf7mr2TZ27sxhF6raDFj1/LMqhV9jvOJtqE2EtRdr
aggENUm4OyFo8ft2CBZzsUveIi49o0I6BAcfKo/XyhuL1vMpMWYK+TYdAoGAYSXn
tsEmNrrORju7QlGadEkXWu8ZgD+hVnkoZVyTYCZ1obooc+5pAguub96VlvGPkClZ
YUzF2u4pWoZ5FtEev9SfUyKtmT9COwywf0ZCl7PxJDeCZ26bN4NPkSS+KSNHCGMT
nuNPLSinVuWRXsW0u8R8oq8nw+XRiYniEk2zZzkCgYA/aS7ph8+4mq9R9Zm3Eicn
kJ3ACmGY2k/vrFV9YuKElTajGDYCrBt8unvJ2F8XWq4vuH4+/nDgws6H6XGQTeBP
puo29uGUd7OqFRPstQREEpMo5eEQ21BWKK44LwzoK1gWwA0qc//hnWTwu8z4kP9A
g2EgmnNdWsds0b+yvInRbg==
-----END PRIVATE KEY-----`;
var clientId = 'BRN-0243-1681371318846';
const date = '2024-10-21T15:23:40+07:00'
console.log('date: ' + date);
const data = clientId +'|'+ date;
console.log('stringToSign: ' + data);
//--- create signature----
const sign = crypto.createSign('SHA256');
sign.update(data);
const signature = sign.sign(publicKey, 'base64');
console.log('Signature:', signature);



const data2 = clientId +'|'+ date;
const verifier = crypto.createVerify("SHA256");
verifier.update(StringToSign);
return verifier.verify(publicKey, signature, "base64");



