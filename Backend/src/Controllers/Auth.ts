import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import Config from '../Config/nodeMailer'

const prisma = new PrismaClient()

const registerController = async(req:any,res:any)=>{
    try {
        
        const { email,name,password } = req.body
    const isUser = await prisma.user.findUnique({
        where : {email:email},
    })
    if(isUser)
        return res.status(401).send("Email already taken!!")
    const randomOTP : string = `${Math.floor(100000 + Math.random() * 900000)}`
    await Config.sendOTPForVerification(email,randomOTP)
    const salt : string = await bcrypt.genSalt(10)
    const hashedPassword : any = await bcrypt.hash(password,salt)
    const result = await prisma.user.create({
        data : {
            email,
            name,
            password:hashedPassword,
            otp:randomOTP
        } as any
    })
    res.status(200).send(result)

    } catch (error) {
        console.log(error)
    }
}

const loginController = async(req:any,res:any)=>{
    try {
        
        const {email,password} = req.body
        const isUser = await prisma.user.findUnique({
            where :{
                email:email
            }
        })
        if(!isUser)
            return res.status(401).send("Incorrect username or password!")
        const passMatch = await bcrypt.compare(password,isUser.password!)
        if(!passMatch)
            return res.status(401).send("Incorrect username or password!")
        const SECRET_KEY : any = process.env.SECRET_KEY
        const token : string = jwt.sign({ email: isUser.email,role:"email",id:isUser.id },SECRET_KEY , {
            expiresIn : "24h" })
        res.status(200).json({token})        
    } catch (error) {
        console.log(error);
    }
}

const ResetPasswordController = async(req:any,res:any)=>{
    try {
        const { email } = req.body
        const User = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(!User)
            return res.status(401).send("Incorrect Email address!")
        const response = Config.sendPasswordResetEmail(User.email)
        res.status(200).send(response)
    } catch (error) {
        console.log(error);
    }
}

const checkOTP = async(req:any,res:any)=>{
    try {
        const {email,otp} = req.body
        const User : any = await prisma.user.findUnique({
            where :{
                email : email
            }
        })
        if(User && User?.otp === otp) 
            return res.status(200).send("OTP verification sucessfull")
        if(User && User?.otp != otp) {
            res.status(200).send("OTP verification unsuccessfull")
            return await prisma.user.deleteMany({
                where:{
                    email : email
                }
            })
        }  
    } catch (error) {
        console.log(error);
    }
}

const updatePassword = async(req:any,res:any)=>{
    try {
         const {email,newPassword} = req.body
         const salt : string = await bcrypt.genSalt(10)
         const hashedPassword : any = await bcrypt.hash(newPassword,salt)
         const updateUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: hashedPassword,
            },
         })
         res.status(200).send(updateUser)
    } catch (error) {
        console.log(error);
    }
}

export default {registerController,loginController,ResetPasswordController,checkOTP,updatePassword}

