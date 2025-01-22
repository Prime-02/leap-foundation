"use client";
import React, {useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/toWEBP/logo.webp";
import { navItems } from "../index/Index";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Modal from "../Modal/Modal";
import { Textinput } from "../inputs/Textinput";
import { ActiveSession, createUser, signIn } from "../../../lib/appwrite";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NavTwo = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const nav = useRouter();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

    const checkSession = useCallback(async () => {
      const session = await ActiveSession();
      setIsLoggedIn(session); // Cache session status
      console.log(session);
      
    }, []);

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.info("Fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      const result = await signIn(loginForm.email, loginForm.password);
      toast.success("Login Successful");
      nav.push("/admin");
    } catch (error) {
      toast.error("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const signUpSubmit = async (e) => {
    e.preventDefault();
    if (
      !signUpForm.userName ||
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.confirmPassword
    ) {
      toast.info("Fill in all fields");
      return;
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast.warn("Passwords do not match");
    }
    setSubmitting(true);
    try {
      const result = await createUser(
        signUpForm.email,
        signUpForm.password,
        signUpForm.userName
      );
      nav.push("/admin");
      toast.success("Sign Up Successful");
    } catch (error) {
      toast.error("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    checkSession(); // Check session on mount
  }, [checkSession]);

    const handleLogoClick = async () => {
      if (isLoggedIn) {
        nav.push("/admin");
      } else {
        setLoginModal(true);
      }
    };

  return (
    <>
      <nav className="bg-white top-0 w-full z-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="h-12 w-12 relative flex items-center justify-center">
            <Image
              src={Logo}
              alt="Logo"
              className="object-cover rounded-full"
              fill
              onClick={handleLogoClick}
            />
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
              {dropdownOpen ? (
                <X className="ml-2" />
              ) : (
                <Menu className="ml-2" />
              )}
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

      <Modal
        isOpen={loginModal}
        onClose={() => setLoginModal(!loginModal)}
        onSubmit={loginSubmit}
        title={`Login`}
        loading={isSubmitting}
        disabled={isSubmitting}
        buttonValue={"Login"}
      >
        <div>
          <Textinput
            id="login email"
            label={`Email`}
            value={loginForm.email}
            changed={(e) =>
              setLoginForm({
                ...loginForm,
                email: e.target.value,
              })
            }
            className={"border-b"}
          />
        </div>
        <div className="my-4">
          <Textinput
            id="login password"
            label={`Password`}
            value={loginForm.password}
            changed={(e) =>
              setLoginForm({
                ...loginForm,
                password: e.target.value,
              })
            }
            className={"border-b"}
          />
        </div>
      </Modal>

      <Modal
        onSubmit={signUpSubmit}
        isOpen={signUpModal}
        onClose={() => setSignUpModal(!signUpModal)}
        title={"Sign Up"}
        loading={isSubmitting}
        disabled={isSubmitting}
        buttonValue={"Sign Up"}
      >
        <div>
          <Textinput
            id="signup fullname"
            label={`Full Name`}
            value={signUpForm.userName}
            changed={(e) =>
              setSignUpForm({
                ...signUpForm,
                userName: e.target.value,
              })
            }
            className={"border-b"}
          />
        </div>
        <div className="mt-4">
          <Textinput
            id="signup email"
            label={`Email`}
            value={signUpForm.email}
            changed={(e) =>
              setSignUpForm({
                ...signUpForm,
                email: e.target.value,
              })
            }
            className={"border-b"}
          />
        </div>
        <div className="mt-4">
          <Textinput
            id="signup password"
            label={`Password`}
            value={signUpForm.password}
            changed={(e) =>
              setSignUpForm({
                ...signUpForm,
                password: e.target.value,
              })
            }
            className={"border-b"}
          />
        </div>
        <div className="mt-4">
          <Textinput
            id="confirm password"
            label={`Confirm Password`}
            value={signUpForm.confirmPassword}
            changed={(e) =>
              setSignUpForm({
                ...signUpForm,
                confirmPassword: e.target.value,
              })
            }
            className={"border-b"}
          />
        </div>
      </Modal>
    </>
  );
};

export default NavTwo;
