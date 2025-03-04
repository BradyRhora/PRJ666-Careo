import nodemailer from 'nodemailer'
import { findAllUserEmails } from './models/user.js';

// Creates a verification email
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

// Creates a email for the user to reset their password
async function sendPasswordResetEmail(email, userId){
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
            from: `CareO <${process.env.COMPANY_EMAIL}`,
            to: email,
            subject: "Password reset",
            html: `<h1>Reset Your Password</h1>
                    <p>Use the link below to reset your password.</p>
                    <p>Wasn't you? You can safely ignore this email then.</p>
                    <br>
                    <a href="http://localhost:3000/forgot-password?user_id=${userId}">Reset Password</a>`
        });

    }
    catch (err){
        console.error("Error sending password reset email: ", err);    
    }
}

// This function sends email to all users when new product is added to database
async function sendNewProductEmail(users, product) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.COMPANY_EMAIL,
          pass: process.env.BREVO_PASSWORD
        }
      });
  
      const emails = await findAllUserEmails();
  
      const info = await transporter.sendMail({
        from: `CareO <${process.env.COMPANY_EMAIL}>`,
        bcc: emails.join(', '),
        subject: "Check Out New Added Product!",
        html: `<h1>A new product has been added:</h1>
                <p>Name: ${product.name}</p>
                <p>Brand: ${product.brand}</p>
                <p>Type: ${product.type}</p>
                <p>Price: $${product.price}</p>`
      });
  
      console.log("Email sent for new product");
    }
    catch (err) {
      console.error("Error sending new product email: ", err);
    }
}

export { generateVerificationToken };
export { sendVerificationEmail };
export { sendPasswordResetEmail };
export { sendNewProductEmail };