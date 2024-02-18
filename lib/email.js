import nodemailer from 'nodemailer'



async function sendVerificationEmail(email, token){
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        //TODO: replace user and pass with files in .env file
        auth: {
            user: "marco.pasqua03@gmail.com", // Change to a no-reply email
            pass: "xsmtpsib-b23c2a9c0a055603ce209a41ff89671217b5f3539058400ffc2addeed2ccb7cb-96KcOdqkUfbAma3X"
        }
    });
    
    const info = await transporter.sendMail({
        from: 'Marco Pasqua" <marco.pasqua03@gmail.com>"',    
        to: email,
        subject: "Please verify your email",
        html: `<p>Thank you for signing up for Careo! Please click the link below to verify your email address.</p>
                <br>
                <a href="http://localhost:3000/">Verify Email</a>` //Change to a verify link route
    });

    console.log("Email sent")
}

// This function generates a random verification token for the email verification
function generateVerificationToken() {
    const tokenLength = 32;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

export { generateVerificationToken };
export { sendVerificationEmail };