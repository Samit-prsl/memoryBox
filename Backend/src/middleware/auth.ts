import { Response,NextFunction } from "express"
import jwt from 'jsonwebtoken'


const auth : any = async (req:any,res:Response,next:NextFunction) =>{
    const SECRET_KEY : any = process.env.SECRET_KEY
    const header = req.headers.authorization
    if(header)
        {
            const token = header.split(' ')[1]
            jwt.verify(token,SECRET_KEY,(err:any,user:any)=>{
                if(err)
                    {
                        return res.status(403)
                    }
                req.user = user   
                next() 
            })
        }
        else
        return res.status(201)
}

export default auth