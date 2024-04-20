import { useState } from 'react'
import { IoLogoWebComponent } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@/Components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/Components/ui/form"
  import { Input } from "@/Components/ui/input"
  import { GoogleLogin } from '@react-oauth/google';

  const formSchema = z.object({
    username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })

export default function Register() {

    const [viewPassword,SetViewPassword] = useState<boolean>(false)
    // const [email,Setemail] = useState<string>("")
    // const [name,Setname] = useState<string>("")
     const [password,Setpassword] = useState<string>()


      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email : "",
          password : ""
        },
      })

      function onSubmit(data:any) {
        console.log(data)

      }

      function checkPasswordStrong(password:string){
        const RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return RegExp.test(password)
      }


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
                {/* <FcGoogle className="mr-2 h-4 w-4" /> Login with Gmail */}
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        window.location.replace('/')
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    shape='pill'
                    theme='filled_black'

                />
        </div>
        <div className=' mb-5 w-[20%]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} className=' outline-none'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                        />
                <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@email.com" type='email' {...field} className=' outline-none'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                        />
                <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl className='flex gap-2'>
                                {/* <Input placeholder="shadcn" type='password' {...field} /> */}
                                <div className="flex w-full max-w-sm items-center space-x-2 bg-white rounded-md">
                                        <Input type={viewPassword ? ``:`password`} placeholder="password" {...field} className=' outline-none' />
                                        {
                                            viewPassword ?
                                                <FaEye className=' text-4xl cursor-pointer pr-2' onClick={()=>SetViewPassword(!viewPassword)}/>
                                                :
                                                <FaEyeSlash className=' text-4xl cursor-pointer pr-2' onClick={()=>SetViewPassword(!viewPassword)} />
                                        }
                                </div>
                            </FormControl>
                            <div className='my-2'>
                                {
                                field.value && field.value.length > 0 && !checkPasswordStrong(field.value)
                                && 
                                (<FormMessage>
                                    Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
                                </FormMessage>)
                                }
                            </div>
                        </FormItem>
                        )}
                        />
               <div className=' h-full flex justify-center items-center mt-5'>
                    <Button type="submit" >Signup</Button>
               </div>
      </form>
    </Form>
        </div>
    </div>
    </>
  )
}
