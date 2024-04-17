import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const uploadDataForNFTController = async(req:any,res:any)=>{
    try {
        const {avatar,description,pic} = req.body
        const newUpload = await prisma.uploads.create({
            data : {
                avatar : avatar,
                description : description,
                pic : pic,
                nft : '',
                user : {
                    connect : {
                        id : req.user
                    }
                }
            } as any
        })
        res.status(200).send(newUpload)
    } catch (error) {
        console.log(error);
    }
}

const updateLinkinNFTController = async(req:any,res:any) =>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export default {uploadDataForNFTController,updateLinkinNFTController}