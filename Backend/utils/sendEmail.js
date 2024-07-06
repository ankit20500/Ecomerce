const nodeMailer=require("nodemailer")
// const SendmailTransport = require("nodemailer/lib/sendmail-transport")

const sendEmail=async(options)=>{
    console.log(options.email)
    const transporter=nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_EMAIL,
            pass:process.env.SMPT_PASSWORD

        },
    });

    const mailOption={
        from:process.env.SMPT_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOption);
}

module.exports=sendEmail;