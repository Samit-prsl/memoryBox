import express from 'express'
const route = express()
import Controller from '../Controllers/Uploading'
import auth from '../middleware/auth'

route.post('/uploadData',auth,Controller.uploadDataForNFTController)
route.put('/updatelink/:id',auth,Controller.updateLinkinNFTController)


export default route