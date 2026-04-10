"use client"
import Logo from "@/assets/Logo/Logo.png";
import Profile_Pic from "@/assets/profile pics/profile_placeholder.png";
import { useAuth } from "@/context/authContext";
import Image from 'next/image';
import { useEffect, useState } from "react";

const DateAndTime = () => {
    const [now, setNow] = useState(new Date());
    

    useEffect(() => {
        const interval = setInterval(() => {
        setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    const monthName = now.toLocaleDateString("en-US", { month: "long" });
    const day = now.getDate();
    const year = now.getFullYear();
    const time = now.toLocaleTimeString();

    return (
        <div className='flex flex-col items-center cursor-default text-sm'>
            <p>{dayName} {day} {monthName} {year}</p>
            <p>{time}</p>
        </div>
    );
};


const NavBar = () => {
    const { user, loading } = useAuth();
    const [isLogoLoaded, setIsLogoLoaded] = useState<boolean>(false)
    const [isProfilePicLoaded, setIsProfilePicLoaded] = useState<boolean>(false)

  return (
    <div className='bg-white shadow-xs flex items-center justify-between py-2 px-5 z-9999'>
        <div className='flex items-center gap-x-2'>
            <div className='size-10 relative'>
                {!isLogoLoaded && <div className="absolute inset-0 bg-black/10 animate-pulse rounded z-5" />}   
                <Image src={Logo} alt='QuickMeds Logo' className={`w-full h-full object-contain ${isLogoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLogoLoaded(true)}/>
            </div>
            <h3>QuickMeds</h3>
        </div>

        <DateAndTime/>

        <div>
            <div className='flex items-center gap-x-4 pl-4 rounded-full bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors'>
                {loading ? <div className="h-4 w-24 bg-blue-200/40 animate-pulse rounded" /> : <h6 className='text-sm'>{user ? `${user.first_name} ${user.last_name}` : "Unknown"}</h6>}
                <div className='relative rounded-full size-10 overflow-hidden'>
                    {/* {!isProfilePicLoaded && <div className="absolute inset-0 bg-blue-200/40 animate-pulse rounded z-5" />}    */}
                    {loading ? <div className="w-full h-full bg-blue-200/40 animate-pulse rounded" /> : <Image src={user?.profile_image as string ?? Profile_Pic} alt={user?.username ?? "unknown user"} fill  className={`object-cover ${isProfilePicLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsProfilePicLoaded(true)}/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar