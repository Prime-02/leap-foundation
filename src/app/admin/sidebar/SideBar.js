"use client";
import { LogOut, Menu, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { toast } from "react-toastify";
import { TextArea, Textinput } from "@/components/inputs/Textinput";
import { Loader } from "@/components/Loader/Loader";
import { Button } from "@/components/reusables/buttons/Buttons";
import {
  AdminLogOut,
  uploadPost,
  uploadServices,
} from "../../../../lib/appwrite";
import { useGlobalState } from "@/app/GlobalProvider";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false); // Service modal state
  const [serviceTitle, setServiceTitle] = useState(""); // Service title state
  const [serviceDescription, setServiceDescription] = useState(""); // Service description state
  const [serviceFile, setServiceFile] = useState(null); // Service file state
  const [aside, setAside] = useState(false);

  const { user, fetchUser, fetchPosts } = useGlobalState();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // If the user is still loading or not available yet
  if (!user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleServiceFileChange = (e) => {
    setServiceFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);
    try {
      const post = await uploadPost(file, title, description, user.$id);
      toast.success("Post uploaded successfully!");
      console.log("Post details:", post);
      // Clear inputs after successful upload
      setTitle("");
      setDescription("");
      setFile(null);
      setModal(false);
      fetchPosts();
    } catch (error) {
      toast.error("Failed to upload post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!serviceFile) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);
    try {
      const service = await uploadServices(
        serviceFile,
        serviceTitle,
        serviceDescription,
        user.$id
      );
      toast.success("Service uploaded successfully!");
      console.log("Service details:", service);
      // Clear inputs after successful upload
      setServiceTitle("");
      setServiceDescription("");
      setServiceFile(null);
      setServiceModal(false);
    } catch (error) {
      toast.error("Failed to upload service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await AdminLogOut();
    } catch (error) {
      toast.error("Error Logging Out", error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(user);

  return (
    <>
      <header className="w-full z-30 h-auto flex justify-between px-12 items-center py-3">
        <div className="flex items-center gap-4 ">
          <img
            src={user.avatar || "/default-avatar.png"} // Fallback image
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-gray-300 object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-600">Welcome,</h1>
            <span className="text-lg font-bold text-gray-800 capitalize">
              {user.username || "User"}
            </span>
          </div>
        </div>
        <div className="cursor-pointe md:hidden" onClick={() => setAside(!aside)}>
          {!aside ? <Menu size={24} /> : <X size={24} />}
        </div>
      </header>
      <aside
        className={`fixed z-10 min-h-screen w-[70%] px-5 md:w-[25%] flex flex-col justify-between transition duration-700 pb-12 pt-5 items-center bg-white top-0 bottom-0
        ${!aside ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
        `}
      >
        <div className="w-full">
          <div className="flex flex-col justify-center items-center gap-4">
            <img
              src={user.avatar || "/default-avatar.png"} // Fallback image
              alt="User Avatar"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-sm text-gray-600">Welcome,</h1>
              <span className="text-2xl font-bold text-gray-800 capitalize">
                {user.username || "User"}
              </span>
              <span className=" text-gray-800 capitalize">
                {user.email || "User"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <Link
            href={"/admin"}
            className="text-green-800 hover:underline cursor-pointer text-lg font-semibold"
          >
            View Events Posts
          </Link>
          <Link
            href={"/admin/services"}
            className="text-green-800 hover:underline cursor-pointer text-lg font-semibold"
          >
            View Services Posts
          </Link>
          <span
            className="text-green-800 hover:underline cursor-pointer text-lg font-semibold"
            onClick={() => setModal(true)}
          >
            Add Events Post
          </span>
          <span
            className="text-green-800 hover:underline cursor-pointer text-lg font-semibold"
            onClick={() => setServiceModal(true)}
          >
            Add services Post
          </span>
        </div>

        <div>
          <Button
            text={"Log Out"}
            icon={<LogOut />}
            reverse={true}
            onClick={logOut}
          />
        </div>
      </aside>

      {/* Modal for Uploading Posts */}
      <Modal
        title={"Add New Post"}
        isOpen={modal}
        onClose={() => setModal(!modal)}
        buttonValue={"Upload Post"}
        loading={loading}
        disabled={loading}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div>
            <Textinput
              type="text"
              label={"Title"}
              id="title"
              value={title}
              changed={(e) => setTitle(e.target.value)}
              className="mt-1 border rounded-xl"
              labelStyle={"bg-white"}
              placeholder="Enter post title"
            />
          </div>
          <div>
            <TextArea
              id="description"
              label={"Description"}
              value={description}
              changed={(e) => setDescription(e.target.value)}
              className="mt-1 border-b"
              labelStyle={"bg-white"}
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image/Video
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
        </div>
      </Modal>

      {/* Modal for Uploading Services */}
      <Modal
        title={"Add New Service"}
        isOpen={serviceModal}
        onClose={() => setServiceModal(!serviceModal)}
        buttonValue={"Upload Post"}
        loading={loading}
        disabled={loading}
        onSubmit={handleServiceSubmit}
      >
        <div className="flex flex-col gap-4">
          <div>
            <Textinput
              type="text"
              label={"Service Title"}
              id="serviceTitle"
              value={serviceTitle}
              changed={(e) => setServiceTitle(e.target.value)}
              className="mt-1 border rounded-xl"
              labelStyle={"bg-white"}
              placeholder="Enter service title"
            />
          </div>
          <div>
            <TextArea
              id="serviceDescription"
              label={"Service Description"}
              value={serviceDescription}
              changed={(e) => setServiceDescription(e.target.value)}
              className="mt-1 border-b"
              labelStyle={"bg-white"}
            />
          </div>
          <div>
            <label
              htmlFor="serviceFile"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image/Video
            </label>
            <input
              type="file"
              id="serviceFile"
              onChange={handleServiceFileChange}
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SideBar;
