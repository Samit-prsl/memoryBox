import express from 'express'
import cors from 'cors'
import Auth from './Routes/Auth'
import Upload from './Routes/Uploading'
import UserUploads from './Routes/UserUploads'

const app = express()
const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.status(200).send("Home route working fine!")
})

app.use(express.json())
app.use(cors())
app.use('/auth',Auth)
app.use('/upload',Upload)
app.use('/user', UserUploads)

app.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`)
})
