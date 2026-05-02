"use client"
import LoginCover from "@/assets/login/loginCover3.jpg"
import Cover from "@/assets/login/loginCover4.jpg"
import Logo from "@/assets/Logo/Logo-2.png"
import { InputField, PasswordField } from '@/components/Global/Form'
import LoadingSpinner from '@/components/Global/LoadingSpinner'
import { getErrorMessage } from "@/helper"
import { useloginUser } from '@/hooks/users/useUsers'
import { LoginData } from '@/interfaces'
import { LoginFormData, loginSchema } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const Login = () => {
  const router = useRouter()
  const [isLogoLoaded, setIsLogoLoaded] = useState<boolean>(false)
  const [isBannerLoaded, setIsBannerLoaded] = useState<boolean>(false)

      const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
      })

  const login = useloginUser()

  const onSubmit = (data: LoginData) => {
    login.mutate(data, {
      onSuccess: () => {
        toast.success("Login Successful")
        router.refresh();
        router.push("/dashboard")
      },
      onError: (error: any) => {
        const message = getErrorMessage(error, "Login Failed!");
        toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
      }
    })
  }
    
  return (
    <div className='hidden w-screen flex-1 lg:flex justify-center items-center relative '>
      <div className='w-full h-full absolute inset-0 bg-black/60 z-20'></div>
      <Image src={Cover} alt='Quick Meds Login Cover' fill placeholder='blur' className='w-full h-full object-cover'/>
      <div className='z-999'>
        {login.isPending && <LoadingSpinner />}
      </div>
        <div className='flex flex-row rounded-lg  bg-white/93 shadow-md relative z-80  overflow-hidden'>

          <div className='p-6 w-100'>
             <div className='size-40 mb-5 overflow-hidden rounded-lg border-3 border-white shadow mx-auto relative'>
              {/* {!isLogoLoaded && <div className="absolute inset-0 bg-black/5 animate-pulse rounded z-5" />}    */}
              <Image src={Logo} alt='Quick Meds' fill placeholder="blur" className={`w-full h-full object-contain ${isLogoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLogoLoaded(true)}/>
            </div>
            <h4 className='text-center text-sm font-semibold mb-5'>Welcome to QuickMeds</h4>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3'>
                <InputField name='username' label='username' register={register} errors={errors}/>
                <PasswordField name='password' label='Password' register={register} errors={errors}/>

                <button type='submit' className='text-sm mt-2 px-5 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors cursor-pointer'>Login</button>
                {/* <p className='text-blue-700  hover:underline text-xs cursor-pointer'>Forgot password?</p> */}
            </form>
          </div>

          <div className='hidden sm:block w-80 p-1'>
            <div className='flex flex-col overflow-hidden relative rounded-lg w-full h-full'>
              <div className='w-full h-full absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-50'></div>
              <Image src={LoginCover} alt='Quick Meds' fill placeholder="blur" className={`w-full h-full object-cover ${isBannerLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsBannerLoaded(true)}/>
              <div className='relative z-120 text-white mt-auto p-3 text-sm'>
                <p>{`" Your Reliable Medical Supply & Distribution System "`}</p>
              </div>
            </div>
          </div>

           
        </div>
    </div>
  )
}

export default Login