const express = require("express");
const app = express();
const port = 3000;
const{SendReceiveMailFromTestMail,SendReceiveMailFromRealMail} =require('./src/emails/nodeMailer')

app.get("/emailTest", async (req, res) => {
  //------------------------------------------- TO send Email to testing account--------------------
  SendReceiveMailFromTestMail()
  // -----------------------------------------------------------------------------------------------

  res.send("message sent coppy the url from terminal and paste it on browser to see the mail");
});

app.get("/emailReal", (req, res) => {
  // -----------------Sending mail from gmail account-------------------------------------------------
  SendReceiveMailFromRealMail()
  //   -----------------------------------------------------------------------------------------------
  res.send("check your mail to see the mail");
  
});

app.listen(port, () => {
  console.log("server is runnig at port" + port);
});
