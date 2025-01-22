"use client";
import Footer from "@/components/footer/Footer";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import LoadingScreen from "@/components/Loader/LoadingScreen";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function ClientLayout({ children }) {
  const pathname = usePathname(); // Current route path


  // Check if the current path starts with '/admin'
  const hide = pathname.startsWith("/admin") || pathname.startsWith("/profile");
      const [loading, setLoading] = useState(false);


    useEffect(() => {
      const handleRouteChange = () => {
        setLoading(true);
      };

      handleRouteChange();

      // Hide loading screen after navigation completes
      const timer = setTimeout(() => {
        setLoading(false);
      }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);

      return () => {
        clearTimeout(timer);
      };
    }, [pathname]);


  return (
    <main className="min-h-screen">
      { loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
          aria-hidden={!loading}
          aria-label="Loading screen"
        >
          <div className="flex flex-col items-center gap-y-5">
            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src="/assets/toWEBP/logo.webp"
                width={200}
                height={200}
                alt="Loading logo"
                priority // Ensures the image loads quickly
              />
            </div>
            <div>
              <LoadingScreen />
            </div>
          </div>
        </div>
      )}

      {!hide && <Navbar />}

      {/* Render the page content */}
      <div className="w-full min-h-screen">{children}</div>

      {!hide && <Footer />}
    </main>
  );
}
