import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
import Auth from './Routes/Auth'
const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.status(200).send("Home route working fine!")
})

app.use('/auth',Auth)

app.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`)
})

