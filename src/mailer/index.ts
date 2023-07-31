import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER_HOST,
  port: process.env.SMTP_SERVER_PORT,
  //   secure: true, // use TLS
  auth: {
    user: process.env.SMTP_SERVER_USERNAME,
    pass: process.env.SMTP_SERVER_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: '"Wiselord" <info@wiselord.gr', // sender address
    to,
    subject, // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Με το που κανεις το transaction θα σου ερχεται ενα email απο ενα no-reply</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
};

// Our mission is to offer to the world the best investing tools
// helping our customers make the best decisions, with the minimum risk on the market.
// We are a team of experts in the field of finance, investing and technology providing
// the easiest and safest solutions for real-time investing.
