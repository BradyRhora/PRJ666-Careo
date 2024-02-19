import nodemailer from 'nodemailer'



async function sendVerificationEmail(email, token){
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.COMPANY_EMAIL,
                pass: process.env.BREVO_PASSWORD
            }
        });
        
        const info = await transporter.sendMail({
            from: `CareO <${process.env.COMPANY_EMAIL}>`,
            to: email,
            subject: "Please verify your email",
            html: `<p>Thank you for signing up for Careo! Please click the link below to verify your email address.</p>
                    <br>
                    <a href="http://localhost:3000/email-verification?verificationToken=${token}">Verify Email</a>` //Change to a verify link route
        });
    
        console.log("Email sent");
    }
    catch (err){
        console.error("Error sending verification email: ", err);
    }
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