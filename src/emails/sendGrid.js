const sendGridApiKey =
  "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";
const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(sendGridApiKey)
sgMail.setApiKey(sendGridApiKey);
const msg = {
  to: "chaudharymanish684@gmail.com", // Change to your recipient
  from: "chaudharymanish684@gmail.com", // Change to your verified sender
  subject: "First mail from a wensite",
  text: "i guess you have received the mail .it is first mail from  node app",
  // html: '<strong>and easy to do anywhere, even with Node.js </strong>',
};

const sendWelcomeEMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "chaudharymanish684@gmail.com",
    subject: `Thank you ${name} for joining us `,
    text: `Welcome to the App, ${name}. let me know how can we help you`,
  });

  console.log("email sent!!!!");
};

module.exports = { sendWelcomeEMail };
