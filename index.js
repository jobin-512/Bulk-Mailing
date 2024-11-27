

const nodemailer = require("nodemailer");
const mails = require('./data.json');

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "kvinjones02@gmail.com", 
    pass: "ipogyqyjfbruahol", 
    maxMessages: Infinity,
  },
});

const sendMail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "kvinjones02@gmail.com",
      to: to,
      subject: subject,
      html: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:",to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmails = async (mails, subject, text, intervalMs) => {
  let sentEmailsCount = 0;
  const totalMails = mails.length;

  const sendNextEmail = async () => {
    if (sentEmailsCount >= totalMails) {
      console.log("All emails sent, Nodemailer has stopped sending emails");
      return;
    }

    const mail = mails[sentEmailsCount];
    await sendMail(mail.Mail, subject, text);

    sentEmailsCount++;
    setTimeout(sendNextEmail, intervalMs); 
  };

  sendNextEmail(); 
};
let subject = "Website Review";
let text = `<p>Greetings,</p>
            <p>I was surfing through your website and realized that it is not ranking on Google for most searched keywords for your business.ss</p>
            <p>I am associated with one of the best SEO companies in India who helped over 500+ businesses rank on the 1st page of GOOGLE even for the most competitive industries.</p>
            <p>Let me know if you are available to discuss this further.</p>
            <p>Looking forward to your prompt reply.</p>
            <p>Thanks,</p>
            <p>Jobin Thomas</p>`
sendEmails(mails, subject, text, 0);
