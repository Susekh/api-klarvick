import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "kellie.ebert@ethereal.email",
        pass: "Ra9xXVgNSVxXxufvDa",
    },
});
const sendMail = async (to, subject, html) => {
    try {
        console.log("Email to be Sent at ::", to);
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <kellie.ebert@ethereal.email>', // sender address
            to: `Recipient <${to}>`, // list of receivers
            subject: subject, // Subject line
            html: html
        });
        console.log("Message sent: %s", info);
    }
    catch (error) {
        console.error("Error sending mail: ", error);
    }
};
export default sendMail;
//# sourceMappingURL=mailSender.js.map