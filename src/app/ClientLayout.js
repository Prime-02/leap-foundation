"use client";
import Footer from "@/components/footer/Footer";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
export default function ClientLayout({ children }) {
  const pathname = usePathname(); // Current route path


  // Check if the current path starts with '/admin'
  const shouldHideNavbarAndFooter =
    pathname.startsWith("/admin") || pathname.startsWith("/profile");


  return (
    <main className="min-h-screen">

      {!shouldHideNavbarAndFooter && <Navbar />}

      {/* Render the page content */}
      <div className="w-full min-h-screen">{children}</div>

      {!shouldHideNavbarAndFooter && <Footer />}
    </main>
  );
}
