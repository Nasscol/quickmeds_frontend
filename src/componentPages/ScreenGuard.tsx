"use client"
import { useState, useEffect } from "react";

export default function ScreenGuard({children}: { children: React.ReactNode }) {

    const [isSmall, setIsSmall] = useState<boolean | null>(null);

    useEffect(() => {
        const check = () => {
        setIsSmall(window.innerWidth < 1024);
        };

        check();
        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, []);

   if (isSmall === null) {
    return <div className="w-screen h-screen bg-black" />;
    }

   if (isSmall) {
    return (
      <div className="w-screen h-dvh bg-black text-gray-100 flex justify-center items-center text-center text-sm">
        <div>
          <p>For the best user experience, <br/>please open this web application on a larger screen.</p>
          <p>{"(e.g. a laptop, a desktop, a monitor)"}</p>
          <p className="mt-5">Thank You.</p>
        </div>
      </div>
    );
  }

  return children;
}