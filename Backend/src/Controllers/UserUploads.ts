import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const showUserUploads = async(req:any,res:any)=>{
    try {
        const id = req.params.id
        const idNumber = Number(id)
        const userUploads = await prisma.user.findFirst({
            where : {
                id : idNumber
            },
            include: {
                uploads: true 
            }
        })
        if(!userUploads)
            return res.status(404).send("User not found")
        res.status(200).send(userUploads.uploads)
    } catch (error) {
        console.log(error)
    }
}

export default {showUserUploads}