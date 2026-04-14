import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/authContext";
import { Providers } from "./provider";
import 'primeicons/primeicons.css';
import "./globals.css";
import { cookies } from "next/headers";
import { env } from "@/config/env";


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const hasRefreshToken = cookieStore.has('refresh_token');



  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="QuickMeds" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative  bg-gray-100`}>
          
          <Providers>
            <AuthProvider token={hasRefreshToken}>


                {children}

                <Toaster position="top-right" richColors/>


            </AuthProvider>
           </Providers>
      </body>
    </html>
  );
}
