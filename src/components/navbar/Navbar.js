'use client'
import React, { useEffect, useState } from "react";
import { ButtonOne, ButtonTwo } from "../reusables/buttons/Buttons";
import Image from "next/image";
import Logo from "../../../public/assets/toWEBP/logo.webp";
import { navItems } from "../index/Index";
import Link from "next/link";
import {Menu, X } from "lucide-react";

const NavTwo = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      alert("Fill in all fields");
      return;
    }
    alert("Login Successful");
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    if (
      !signUpForm.userName ||
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.confirmPassword
    ) {
      alert("Fill in all fields");
      return;
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Sign Up Successful");
  };

  return (
    <nav className="bg-white top-0 w-full z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="h-12 w-12 relative flex items-center justify-center">
          <Image src={Logo} alt="Logo" className="object-cover rounded-full" fill />
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex ml-8 space-x-6">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="text-black font-bold uppercase hover:underline hover:text-green-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <button
            className="flex items-center text-black focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {dropdownOpen ? <X className="ml-2" /> : <Menu className="ml-2" />}
          </button>
        </div>
      </div>
      {dropdownOpen && (
        <div className="bg-white shadow-md md:hidden">
          <div className="flex flex-col px-4 py-2 space-y-4">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="text-black font-medium hover:text-green-800 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavTwo;
