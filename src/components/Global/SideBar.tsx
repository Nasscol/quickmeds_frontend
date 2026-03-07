"use client"
import Admin_icon from "@/assets/Icons/admin-2.png"
import Dashboard_icon from "@/assets/Icons/dashboard.png"
import Inventory_icon from "@/assets/Icons/inventory.png"
import Manufacturers_icon from "@/assets/Icons/manufacturers-2.png"
import Medicine_icon from "@/assets/Icons/medicine.png"
import POS_icon from "@/assets/Icons/pos.png"
import Reports_icon from "@/assets/Icons/reports.png"
import Settings_icon from "@/assets/Icons/settings-2.png"
import User_icon from "@/assets/Icons/user-1.png"
import Wholesale_icon from "@/assets/Icons/wholesale.png"
import Logo from "@/assets/Logo/Logo-2.png"
import { useAuth } from '@/context/authContext'
import { SidebarLink } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from "react"
import { env } from "@/config/env"
import api from "@/lib/axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const SideBarNav: SidebarLink[]  = [
    {link_name: "Dashboard", link: "/dashboard", icon: Dashboard_icon, isActive: true},
    {link_name: "Point Of Sale", icon: POS_icon, 
        options: [
            {link_name: "Sale", link: "#"},
            {link_name: "Sale History", link: "#"},
        ]
    },
    {link_name: "Inventory", link: "/inventory", icon: Inventory_icon},
    {link_name: "Medicine", link: "/medicine", icon: Medicine_icon},
    {link_name: "Wholesalers", link: "/wholesalers", icon: Wholesale_icon},
    {link_name: "Manufacturers", link: "/manufacturers", icon: Manufacturers_icon},
    {link_name: "Reports", link: "#", icon: Reports_icon, adminOnly: true},
    {link_name: "Administration", icon: Admin_icon, adminOnly: true,
        options: [
            {link_name: "Staff", link: "/staff"},
            {link_name: "Roles", link: "/roles"},
        ]
    },
    {link_name: "Profile", link: "#", icon: User_icon},
    {link_name: "Settings", link: "#", icon: Settings_icon},
]

const SideBarLinks = ({link_name, link, icon, isActive, options}: SidebarLink) => {
    const [open, setOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const hasDropDownList = options && options.length > 0
    


    return (

            <div className="block">
                {/* Parent item */}
                <div onClick={() => hasDropDownList ? setOpen(!open) : null} 
                    className={`min-w-50 flex flex-row gap-x-3 items-center justify-start ${isActive ? "bg-gray-200" : "hover:bg-gray-200"} 
                    cursor-pointer py-2 px-3 rounded-lg transition-colors`}>
                        <div className="size-6 relative">
                             {!isLoaded && <div className="absolute inset-0 bg-black/10 animate-pulse rounded z-5" />}   
                            <Image src={icon} alt={link_name} className={`object-contain w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLoaded(true)}/>
                        </div>

                    {link ? (
                    <Link href={link} className="lg:text-xs m xl:text-sm capitalize flex-1 w-full">
                        {link_name}
                    </Link>
                    ) : (
                    <p className="lg:text-xs m xl:text-sm capitalize flex-1">{link_name}</p>
                    )}

                    {/* Dropdown arrow */}
                    {hasDropDownList && (
                    <span className={`text-xs transition-transform ${open ? "rotate-90" : ""}`}>
                        ▶
                    </span>
                    )}
                </div>

                {/* Dropdown children */}
                {hasDropDownList && (
                    <div className={` ml-10 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                        {options.map((option) => (
                        <Link key={option.link_name} href={option.link}>
                            <div className="text-sm py-1 px-2 rounded-md hover:bg-gray-100">
                            {option.link_name}
                            </div>
                        </Link>
                        ))}
                    </div>
                    )}

            </div>
    )
}

const SideBar = () => {
    const router = useRouter();
    const { user, loading, setUser } = useAuth();
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const filteredNav = SideBarNav.filter(item => !item.adminOnly || user?.groups?.includes("Admin"))

    const onLogout = async() => {
        try{
            await api.post(`${env.usersApi}/auth/logout/`)
            toast.success("Logged out successfully")
            router.refresh()
            router.push("/login")
        } catch {
            toast.error("Failed to Logout!")
        }
    }
    return (
        <div className='px-4 py-10 w-58 shadow h-screen  bg-white hidden lg:block fixed top-0 left-0 overflow-y-auto scrollbar-hide z-40'>
            <div className='flex flex-col items-center mb-8 cursor-default'>
                <div className='mb-4 overflow-hidden rounded-lg border-3 border-white md:size-25 xl:size-30 shadow relative'>
                    {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded z-5" />}   
                    <Image src={Logo} alt='Simon Chainers' className={`w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLoaded(true)}/>
                </div>
                <h5 className='capitalize font-semibold md:text-sm xl:text-base'>QuickMeds System</h5>

                {loading ? <div className="h-5 w-24 bg-black/10 animate-pulse rounded" /> : <h6 className='capitalize lg:text-xs xl:text-sm'>{user ? `${user.groups}` : "Unknown"}</h6>}
            </div>

            <div className='space-y-5'>
                {filteredNav.map((nav, index) => (
                    <SideBarLinks  key={index} link_name={nav.link_name} link={nav.link} icon={nav.icon} isActive={nav.isActive ?? false} options={nav.options}/>
                ))}
                <div>
                    <button onClick={onLogout} className="block w-full text-sm cursor-pointer capitalize py-2 px-3 text-white text-center bg-red-800 hover:bg-red-900 rounded-lg transition-colors">
                        Logout
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default SideBar