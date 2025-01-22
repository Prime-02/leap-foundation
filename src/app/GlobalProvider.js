"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchAllFiles,
  GetAllPosts,
  GetAllServices,
  getCurrentUser,
} from "../../lib/appwrite";
import { useRouter } from "next/navigation";

// Create context
const GlobalStateContext = createContext();

const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [files, setFiles] = useState(null);

  const fetchUser = useCallback(async () => {
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
      router.replace("/");
      toast.warn("Please login to continue");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await GetAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await GetAllServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllFiles();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  useEffect(() => {
    fetchServices();
  }, [services]);

  useEffect(() => {
    fetchFiles();
  }, [files]);

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
        limit={2}
      />
      <GlobalStateContext.Provider
        value={{
          isLoading,
          isLoggedIn,
          user,
          fetchUser,
          posts,
          fetchPosts,
          fetchServices,
          services,
          fetchFiles,
          files,
        }}
      >
        {children}
      </GlobalStateContext.Provider>
    </>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

export default GlobalProvider;
