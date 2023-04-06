// install nodemailer(To send email) package
// install mailgen(To create an interactive email body ) package
const nodemailer = require("nodemailer"); //Nodemailer is a module for Node.js applications-
// -to allow easy as cake email sending.
var Mailgen = require("mailgen"); //To create an interactive mail body

const SendReceiveMailFromTestMail = async () => {
  // In this method we are using test mail account (from website ethereal.email) to send and
  // receive Email,nodemailer.getTestMessageUrl()->used to get the url to see email .
  // 000000000000000[Generate test SMTP service account from  website ethereal.email]00000000000000000000
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount(); //using testAccount we can generate email and
  // pass
  // 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let message = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log(nodemailer.getTestMessageUrl(message));
  //   nodemailer.getTestMessageUrl(message)->this returns a url to see the mail" message" .put that url
  // in the browser to see the email
};

const SendReceiveMailFromRealMail = () => {
    // in this method we are using actual Gmail  to send and receive the email
  //8888888888888888888888888888[Sender Email Information]88888888888888888888888888888888888888888888
  var config = {
    service: "gmail",
    auth: {
      user: "<senderemail@gmail.com>", //sender email
      pass: "<app password generated from gmail>", //password created from gmail to login from any app[myAccount->security
      // ->generate App password(use this password here)]
    },
  };

  let transporter = nodemailer.createTransport(config); //creating transporter to send email

  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  // -------------[Using Mailgen to create mail-for more details mailgen documentation ]--------------
  // Configure mailgen by setting a theme and your product info
  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Manish Chaudhary",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  var response = {
    // this is the body of the email(about each attribute here  you can see on documentation of mailgen)
    body: {
      name: "<receiver name>",
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      action: {
        // insead of action we can use data see  mailgen documentation
        instructions: "To get started with Mailgen, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  var emailBody = mailGenerator.generate(response); //the generate the body of email
  //   =================[receiver-sender details and mail that receiver will receive]====================
  let message = {
    from: "<senderemail@gmail.com>",
    to: "receiver@gmail.com", //receiver email address
    subject: "Sending Email using Node.js",
    html: emailBody,
  };
  // ============================================================================================
  // ************************************[Finally Sending the mail]******************************
  transporter
    .sendMail(message)
    .then((res) => {
      // res.send(res);
      console.log(res)
    })
    .catch((error) => {
      // res.send(error);
      console.log(error)
    });
  // ********************************************************************************************
  // ----------------------------------------------------------------------------------------------
};

module.exports={SendReceiveMailFromTestMail,SendReceiveMailFromRealMail}
