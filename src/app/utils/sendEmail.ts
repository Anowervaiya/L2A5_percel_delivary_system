import nodemailer from "nodemailer"

const transpoter = nodemailer.createTransport({
  secure: true,
  auth: {
    
  }
})