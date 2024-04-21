import React,{ useState } from 'react'
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
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/Components/ui/input-otp"
  import { Input } from "@/Components/ui/input"
  import { GoogleLogin } from '@react-oauth/google';
  import axios from 'axios'


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
    const [email,Setemail] = useState<string>("")
    // const [name,Setname] = useState<string>("")
     //const [password,Setpassword] = useState<string>()
    const [value, setValue] = React.useState("")
    const [click,Setclick] = useState<boolean>(false)
    const [disableUpdateButton,SetdisableUpdateButton] = useState<boolean>(true)
    const [counter,Setcounter] = useState<number>(60)


      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email : "",
          password : ""
        },
      })

      //let email:string

      async function onSubmit(data:any) {
        console.log(data)
        Setclick(true)
        startTimer()
        Setemail(data.email)
        try {
          const Email = data.email
          const password = data.password
          const name = data.username
          const response = await axios.post(`http://localhost:5000/auth/register`,{
            email,name,password
          })
        console.log(response);
        } catch (error) {
          console.log(error);
          Setclick(false)
          alert("something went wrong!")
        }
      }
      
      console.log(email)
      

      function startTimer() {
        const timer = setTimeout(()=>{
          SetdisableUpdateButton(false)
        },60000)
        const interval = setInterval(() => {
          //console.log(seconds);
          Setcounter(prevcounter => prevcounter - 1)
          //console.log(counter);
        }, 1000);
        //clearTimeout(timer)
      }

      async function onOTPSubmit(){
        try {
          const response = await axios.post('http://localhost:5000/auth/checkotp',{
          email,value
        })
        console.log(response)
        
        } catch (error) {
          console.log(error)
        }
      }

      async function onOTPUpdate(){
        startTimer()
        try {
          const response = await axios.put('http://localhost:5000/auth/updateotp',{
          email
        })
        console.log(response)
        alert("OTP has been resend!")
        } catch (error) {
          console.log(error)
        }
      }

      function checkPasswordStrong(password:string){
        const RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return RegExp.test(password)
      }


  return (
    <>
    <div className=' bg-gradient-to-r from-sky-200 to to-sky-400 h-screen p-8 flex flex-col justify-center items-center gap-5 overflow-y-hidden'>
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
                        //window.location.replace('/')
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    shape='pill'
                    theme='filled_black'

                />
        </div>
        <div className=' mb-10 w-[20%]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit,onOTPSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} className='  focus-visible:ring-0'/>
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
                                <Input placeholder="email@email.com" type='email' {...field} className='  focus-visible:ring-0'/>
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
                                        <Input type={viewPassword ? ``:`password`} placeholder="password" {...field} className=' focus-visible:ring-0' />
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
               <div className=' h-full flex justify-center items-center'>
                    {/* <Button type="submit" >Signup</Button> */}
                    <Popover>
                      <PopoverTrigger><Button type="submit" className={click ? `cursor-not-allowed `:`cursor-pointer`} disabled={click}>Signup</Button></PopoverTrigger>
                      <PopoverContent className={` h-80 flex flex-col justify-center items-center bg-sky-600 text-black rounded-xl ${click ? `block`:`hidden`} pt-16`}>
                        <div className="space-y-2">
                              <InputOTP
                                maxLength={6}
                                value={value}
                                onChange={(value:any) => setValue(value)}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                              <div className="text-center text-sm">
                                {value === "" ? (
                                  <>Enter your one-time password sent to your email</>
                                ) : (
                                  <>You entered: {value}</>
                                )}
                              </div>
                              <div className=' h-full flex justify-center items-center gap-4'>
                                <Button onClick={()=>{onOTPSubmit()}}>Submit</Button>
                                {
                                  (counter>0) ?
                                     (
                                      <Button disabled={disableUpdateButton ? true:false}>Resend OTP after {counter}s</Button>
                                  ) :
                                  (
                                    <Button disabled={disableUpdateButton ? true:false} onClick={()=>{onOTPUpdate()}}>Resend OTP</Button>
                                  )
                                }
                              </div>
                            </div>
                      </PopoverContent>
                    </Popover>
               </div>
      </form>
    </Form>
        </div>
    </div>
    </>
  )
}
