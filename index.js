const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const cors = require("cors")

require("dotenv").config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

const myEmail = process.env.EMAIL
const password = process.env.PASSWORD

app.post("/", (req, res) => {

    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: myEmail,
                pass: password
            },
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
        });

        const mailOptions = {
            from: myEmail,
            to: myEmail,
            subject: "Portfolio Email",
            text: `Name: ${name}\nMessage: ${message}\nEmail: ${email}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error)
                res.status(500).json({ error: "Failed to send email" })
            } else {
                console.log("Email sent:", info.response)
                res.status(200).json({ message: "Email sent successfully" })
            }
        })
    } catch (error) {
        console.log(error)
    }
}).listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`)
})