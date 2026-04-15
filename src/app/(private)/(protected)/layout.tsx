"use client"
import LoadingSpinner from "@/components/Global/LoadingSpinner";
import "../../globals.css";
import { useMe } from "@/hooks/users/useUsers";
import { allowedTechGroups } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { data: user, isLoading, isFetching } = useMe();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user && !user?.groups?.some(group => allowedTechGroups.includes(group))) {
            router.replace("/unauthorized");
        }
    }, [user, isLoading, isFetching]);

    if (isLoading || isFetching ||!user?.groups?.some(group => allowedTechGroups.includes(group))) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        );
    }


  return <>{children}</>
}
