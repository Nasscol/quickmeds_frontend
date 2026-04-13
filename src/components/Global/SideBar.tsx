"use client"
import { usePathname } from "next/navigation";
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
import Collapse_icon from "@/assets/Icons/sidebar-1.png"
import LogoutIcon from "@/assets/Icons/logout-1.png"
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
import { useLogoutUser, useMe } from "@/hooks/users/useUsers";
import { getErrorMessage } from "@/helper";

const SideBarNav: SidebarLink[]  = [
    {link_name: "Dashboard", link: "/dashboard", icon: Dashboard_icon},
    {link_name: "Point Of Sale", icon: POS_icon, 
        options: [
            {link_name: "Sale", link: "/point-of-sale/sale"},
            {link_name: "Sale History", link: "/point-of-sale/sale-history"},
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
    {link_name: "Profile", link: "/profile", icon: User_icon},
]

const SideBarLinks = ({link_name, link, icon, isActive, options, isCollapsed, setIsCollapsed}: SidebarLink) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname();
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const hasDropDownList = options && options.length > 0
  
    


    return (
// 
            <div className="block">
                {/* Parent item */}
        <div onClick={() => { if (hasDropDownList) { setOpen(!open); } if (hasDropDownList && isCollapsed && setIsCollapsed) { setOpen(true); setIsCollapsed(false);}} } 
                    className={`${isCollapsed ? "w-full" : "min-w-50"}   ${isActive ? "bg-gray-200" : "hover:bg-gray-200"} 
                    cursor-pointer rounded-lg transition-all`}>
                       

                    {link ? (
            <Link href={link} className={`flex flex-row gap-x-3 items-center lg:text-xs m xl:text-sm capitalize flex-1 w-full ${isCollapsed ? "p-1 justify-center" :"justify-start  py-2 px-3"}`}>
                         <div className="size-6 relative">
                             {!isLoaded && <div className="absolute inset-0 bg-black/10 animate-pulse rounded z-5" />}   
                            <Image src={icon} alt={link_name} className={`object-contain w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLoaded(true)}/>
                        </div>
                        <span className={`${isCollapsed && "hidden"}`}>{link_name}</span>
                    </Link>
                    ) : (
                    <div className="flex flex-row gap-x-3 items-center justify-start lg:text-xs m xl:text-sm capitalize flex-1 py-2 px-3">
                        <div className="size-6 relative">
                             {!isLoaded && <div className="absolute inset-0 bg-black/10 animate-pulse rounded z-5" />}   
                            <Image src={icon} alt={link_name} className={`object-contain w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLoaded(true)}/>
                        </div>

                        <span className={`${isCollapsed && "hidden"}`}>{link_name}</span>

                        {/* Dropdown arrow */}
                        {hasDropDownList && (
                            <span className={`ml-auto text-xs transition-transform ${open ? "rotate-90" : ""} ${isCollapsed && "hidden"}`}>
                                ▶
                            </span>
                        )}
                    </div>
                    )}

                    
                    
                </div>

                {/* Dropdown children */}
                {hasDropDownList && !isCollapsed && (
                    <div className={` ml-10 mt-1 flex flex-col space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            {options.map((option) => {
              const isdropdownActive = pathname === option.link
              return (
              <Link key={option.link_name} href={option.link}>
                <div className={`text-sm py-1 px-2 rounded-md ${isdropdownActive ? "bg-gray-200" : "hover:bg-gray-200"}`}>
                  {option.link_name}
                </div>
              </Link>
            )})}
                    </div>
                    )}

            </div>
    )
}

const SideBar = () => {
    const router = useRouter();
    const { data: user, isLoading: UserLoading } = useMe();
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [isCollapseLoaded, setIsCollapseLoaded] = useState<boolean>(false)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
  

    const filteredNav = SideBarNav.filter(item => !item.adminOnly || user?.groups?.includes("Admin"))
    const log_out = useLogoutUser()

    const onLogout = async() => {
       log_out.mutate(undefined, {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.refresh();
            router.push("/login");
          },
          onError: (error: any) => {
            const message = getErrorMessage(error, "Unable to logout!");
            toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
          },
    })}


return (
      <div className={`px-4 pt-5 pb-10 ${isCollapsed ? "w-20" : "w-58"} h-screen  bg-white hidden lg:block  overflow-y-auto scrollbar-hide z-40 transition-all duration-300 ease-in-out`}>
        <div className="relative mb-6 size-6 ml-auto cursor-pointer">
          {!isCollapseLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded z-5" />}   
          <Image src={Collapse_icon} alt='Collapse sidebar' onClick={() => setIsCollapsed(!isCollapsed)} className={`w-full h-full ${isCollapseLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsCollapseLoaded(true)}/>
        </div>
        
        <div className={`flex flex-col items-center ${isCollapsed ? "mb-4" : "mb-8"} cursor-default`}>
          <div className={`mb-4 overflow-hidden rounded-lg border-3 border-white ${isCollapsed ? "size-10" : "md:size-25 xl:size-30"} shadow relative`}>
                    {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded z-5" />}   
                    <Image src={Logo} alt='Logo' className={`w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} onLoad={() => setIsLoaded(true)}/>
                </div>
          <h5 className={`capitalize ${isCollapsed && "hidden"} font-semibold md:text-sm xl:text-base`}>QuickMeds System</h5>

                {UserLoading ? <div className="h-5 w-24 bg-black/10 animate-pulse rounded" /> : <h6 className='capitalize lg:text-xs xl:text-sm'>{user ? `${user.groups}` : "Unknown"}</h6>}
            </div>

            <div className='space-y-5'>
          {filteredNav.map((nav, index) => {
            const isActive = pathname === nav.link
            
            return (
              <SideBarLinks key={index} link_name={nav.link_name} link={nav.link} icon={nav.icon} isActive={isActive} options={nav.options} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
            )
          })}
                <div>
                    <button onClick={onLogout} className={`flex flex-row gap-x-3 items-center lg:text-xs m xl:text-sm capitalize flex-1 w-full ${isCollapsed ? "p-1 justify-center" :"justify-start  py-2 px-3"} bg-red-800 hover:bg-red-900 text-white transition-colors cursor-pointer rounded-lg`}>
                        <Image src={LogoutIcon} alt="Logout" className="size-5 object-contain"/>
              <span className={`${isCollapsed ? "hidden" : ""}`}>Logout</span>
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default SideBar