import express from 'express'
const route = express()
import Controller from '../Controllers/UserUploads'
import auth from '../middleware/auth'

route.get('/:id/getuploads',auth,Controller.showUserUploads)

export default route