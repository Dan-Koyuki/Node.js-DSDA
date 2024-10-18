import nodemailer from 'nodemailer'
import crypto from 'crypto'
import CustomError from '../utility/customError.js'

class AuthController {
  constructor () {
    this.code = null // Placeholder for the code object
    this.CODE_VALIDITY = 5 * 60 * 1000 // 5 minutes in milliseconds
    this.AuthorizationData = []
    this.AUTH_VALIDITY = 60 * 60 * 1000
  }

  // Send the one-time code to the recipient's email
  sentMail = async (recipient) => {
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

    // Define the mail options
    const mailOptions = {
      from: `"DSDA" <${process.env.EMAIL_USER}>`,
      to: recipient, // Recipient's email
      subject: 'Login Code',
      text: `Your login code is ${oneTimeCode}. It will expire in 5 minutes.`, // Text body
      html: `<p>Your login code is <b>${oneTimeCode}</b>. It will expire in 5 minutes.</p>` // HTML body
    }

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info);
  
      return {
        statusCode: 200,
        data: {
          message: info.response // Use info.response to capture the response
        }
      };
    } catch (error) {
      console.error("Error sending email:", error);
      throw new CustomError("Mail can't be sent, service unavailable now. Please try again later!", 503);
    }
  }

  verify = (inputCode) => {
    const currentTime = new Date() // Get current time

    // Check if the code has expired
    if (currentTime - this.code.created > this.CODE_VALIDITY) {
      return new CustomError("The code has expired. Please request a new code.", 400)
    }

    console.log("Im here?")
    // Check if the input code matches the stored code
    if (inputCode === this.code.code) {
      let authToken

      // Generate a unique auth token
      do {
        authToken = crypto.randomInt(100000, 999999).toString() // Generate new authToken
      } while (this.AuthorizationData.find(auth => auth.token === authToken)) // Check if it already exists

      const authCreationTime = new Date()

      // Store the Authorization token and creation time
      const Authorization = {
        token: authToken,
        created: authCreationTime
      }

      // Remove expired tokens before adding the new one
      this.removeExpiredTokens(currentTime)

      // Push the new token to AuthorizationData
      this.AuthorizationData.push(Authorization)

      return {
        statusCode: 200,
        data: {
          codeData: Authorization.token,
          duration: this.AUTH_VALIDITY // Token validity duration
        }
      }
    } else {
      throw new CustomError('Invalid Code!', 400)
    }
  }

  // Remove expired tokens from AuthorizationData
  removeExpiredTokens = (currentTime) => {
    this.AuthorizationData = this.AuthorizationData.filter(auth => {
      return currentTime - auth.created <= this.AUTH_VALIDITY
    })
  }

  validateToken = (req, res, next) => {
    const currentTime = new Date();
  
    // Retrieve token from request headers (or cookies, or other means)
    const token = req.headers['myToken'];
  
    // Clean up expired tokens
    this.removeExpiredTokens(currentTime);
  
    // Find the authorization data for the provided token
    const authData = this.AuthorizationData.find(auth => auth.token === token);
  
    // Check if the token exists
    if (!authData) {
      return res.status(401).json({ message: 'Invalid authorization token' });
    }
  
    // Check if the token has expired
    if (currentTime - authData.created > this.AUTH_VALIDITY) {
      return res.status(401).json({ message: 'Authorization token has expired' });
    }
  
    // Token is valid, proceed to the next middleware or route
    next();
  };
  
}

// Export an instance of AuthController
const authController = new AuthController()
export default authController
