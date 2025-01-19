
'use client'
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../../lib/appwrite";
import { useRouter } from "next/navigation";

// Create context
const GlobalStateContext = createContext();

const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true); // Indicate loading state
        const res = await getCurrentUser();
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user. Redirecting to login.");
        router.push("/");
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    fetchUser();
      }, [user]); // Add `router` as a dependency to avoid warnings

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <GlobalStateContext.Provider value={{ isLoading, isLoggedIn, user }}>
        {children}
      </GlobalStateContext.Provider>
    </>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

export default GlobalProvider;
