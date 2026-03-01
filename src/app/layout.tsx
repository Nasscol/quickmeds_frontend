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
  const token = cookieStore.get('access_token');
  
  let user = undefined;

  if (token) {
    try {
      // Direct call to Django using the cookie
      const res = await fetch(`${env.api}${env.usersApi}/me/`, {
        headers: {
          Cookie: `access_token=${token.value}`,
        },
        cache: 'no-store',
      });
      if (res.ok){
        user = await res.json();
      }
    } catch (err) {
      console.error("Auth pre-fetch failed", err);
    }
  }


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-gray-100`}>
        <AuthProvider initialUser={user}>

          <Providers>

            {children}

            <Toaster position="top-right" richColors/>

           </Providers>

        </AuthProvider>
      </body>
    </html>
  );
}
