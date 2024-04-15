import express from 'express'
const route = express()
import Controller from '../Controllers/Auth'

route.post('/register', Controller.registerController)
route.post('/login',Controller.loginController)
route.post('/resetpassword',Controller.ResetPasswordController)
route.post('/checkotp',Controller.checkOTP)

export default route