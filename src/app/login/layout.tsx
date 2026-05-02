"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const [isSmall, setIsSmall] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

   if (isSmall) {
    return (
      <div className="w-screen h-screen bg-black text-gray-100 flex justify-center items-center text-center text-sm">
        <div>
          <p>Please use a Bigger screen inorder to use this Web Application.</p>
          <p>{"(e.g. a laptop, desktop)"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">   
      {children}
    </div>
  );
}