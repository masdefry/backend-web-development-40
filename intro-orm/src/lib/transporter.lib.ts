import nodemailer from 'nodemailer'; 
import 'dotenv/config'; 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ryan.fandy@gmail.com",
    pass: process?.env?.NODEMAILER_APP_PASSWORD, 
  },
  secure: false, 
  tls: {
    rejectUnauthorized: false
  }
});

export default transporter;