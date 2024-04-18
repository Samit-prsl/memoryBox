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
                        id : req.user.id
                    }
                }
            } as any
        })
        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                uploads: {
                    connect: {
                        id: newUpload.id,
                    },
                },
            },
            include: {
                uploads: true,
            },
        });    
        res.status(200).json({"Upload":newUpload,"User":updatedUser})
    } catch (error) {
        console.log(error);
    }
}

const updateLinkinNFTController = async(req:any,res:any) =>{
    try {
        const {link} = req.body
        const id  = req.params.id
        const numberId = Number(id)
        const updateUploads = await prisma.uploads.update({
            where: {
                id: numberId
            } as any,
            data: {
                nft: link,
            }
        })
        res.status(200).send(updateUploads)
    } catch (error) {
        console.log(error)
    }
}


export default {uploadDataForNFTController,updateLinkinNFTController}