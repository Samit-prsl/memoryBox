import React from 'react'
import { IoLogoWebComponent } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/Components/ui/button"
export default function Register() {
  return (
    <>
    <div className=' bg-gradient-to-r from-sky-200 to to-sky-400 min-h-screen p-8 flex flex-col justify-center items-center gap-5'>
        <div className=' h-full flex justify-center items-center'>
            <IoLogoWebComponent className=' text-center text-4xl'/>
        </div>
        <div className=' '>
            <h1 className=' text-3xl'>Create an account</h1>
            <h5 className=' text-xl text-center text-gray-500'>start minting NFTs</h5>
        </div>
        <div>
            <Button className=' rounded-[4rem] p-5 bg-slate-800'>
                <FcGoogle className="mr-2 h-4 w-4" /> Login with Gmail
            </Button>
        </div>
        <div>
            
        </div>
    </div>
    </>
  )
}
