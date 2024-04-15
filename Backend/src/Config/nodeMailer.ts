import Nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const Html = `
    <h1>Reset Password</h1>
    <a href='http://localhost:5173/'>Click to reset</a>
`

async function main(){
    let Transporter =  Nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        secure : true,
        auth : {
            user : 'samit.off2001@gmail.com',
            pass : process.env.EMAIL_PASSWORD
        }
    })

    return Transporter
}

async function sendPasswordResetEmail(To:string){
    const Transporter = main()
    const info = (await Transporter).sendMail({
        from : 'MemoryBoxNFT <samit.off2001@gmail.com>',
        to : To,
        subject : "Reset Password for MemoryBox 🤞",
        html : Html
    })
    return ((await info).messageId);
}

async function sendOTPForVerification(To:string,OTP:string){
    const Transporter = main()
    const info = (await Transporter).sendMail({
        from : 'MemoryBoxNFT <samit.off2001@gmail.com>',
        to : To,
        subject : "OTP for Email Verification 🤞",
        html : OTP
    })
    return ((await info).messageId);
}

export default {sendPasswordResetEmail,sendOTPForVerification}