import nodemailer from 'nodemailer'
import crypto from 'crypto'

class AuthController {
  constructor () {
    this.code = null // Placeholder for the code object
    this.CODE_VALIDITY = 5 * 60 * 1000 // 5 minutes in milliseconds
  }

  // Send the one-time code to the recipient's email
  sentMail = async recipient => {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // Use true for 465, false for 587
      auth: {
        user: process.env.myMail, // Your Sendinblue email
        pass: process.env.myPass // Your Sendinblue SMTP API key
      }
    })

    // Generate a random 6-digit code
    const oneTimeCode = crypto.randomInt(100000, 999999).toString()
    const codeGenerationTime = new Date() // Record the time the code was generated

    // Store the code and creation time in the controller instance
    this.code = {
      code: oneTimeCode,
      created: codeGenerationTime
    }

    console.log('Im here 1?')

    // Define the mail options
    const mailOptions = {
      from: `"DSDA" <${process.env.EMAIL_USER}>`,
      to: recipient, // Recipient's email
      subject: 'Login Code',
      text: `Your login code is ${oneTimeCode}. It will expire in 5 minutes.`, // Text body
      html: `<p>Your login code is <b>${oneTimeCode}</b>. It will expire in 5 minutes.</p>` // HTML body
    }

    // Send the email
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
  }

  // Verify the input code
  verify = inputCode => {
    const currentTime = new Date() // Get current time

    // Check if the code has expired
    if (currentTime - this.code.created > this.CODE_VALIDITY) {
      return { success: false, message: 'Code has expired' }
    }

    // Check if the input code matches the stored code
    if (inputCode === this.code.code) {
      return { success: true, message: 'Code is valid' }
    } else {
      return { success: false, message: 'Invalid code' }
    }
  }
}

// Export an instance of AuthController
const authController = new AuthController()
export default authController
