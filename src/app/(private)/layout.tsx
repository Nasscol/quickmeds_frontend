import { NavBar, SideBar } from "@/components/Global";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'primeicons/primeicons.css';
import "../globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickMeds",
  description: "QuickMeds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <SideBar />
        <main className=" bg-slate-100 h-screen overflow-y-auto">
          <NavBar />
          <div className="p-6 relative container mx-auto">
            {children}
          </div>
        </main>
    </div>
  );
}
