"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../GlobalProvider";
import Modal from "@/components/Modal/Modal";
import { uploadPost } from "../../../lib/appwrite";
import { toast } from "react-toastify";
import { TextArea, Textinput } from "@/components/inputs/Textinput";

const Layout = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { user, fetchUser, fetchPosts } = useGlobalState();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);


  // If the user is still loading or not available yet
  if (!user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      fetchPosts()
    } catch (error) {
      toast.error("Failed to upload post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <header className="w-full h-auto min-h-12 border-b flex justify-between px-8 items-center">
          <span className="flex items-center flex-row-reverse gap-x-2">
            <span className="flex flex-col items-start">
              <h1 className="text-base">Welcome,</h1>
              <span className="text-xl font-semibold">
                {user.username || "User"}
              </span>
            </span>

            <img
              src={user.avatar || "/default-avatar.png"} // Provide a fallback image
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </span>
          <span
            className="bg-green-200 rounded-full w-7 h-7 flex items-center justify-center text-green-800 cursor-pointer"
            onClick={() => setModal(!modal)}
          >
            <Plus />
          </span>
        </header>
        {children}
      </div>
      <Modal
        title={"Add New Post"}
        isOpen={modal}
        onClose={() => setModal(!modal)}
        buttonValue={`${loading ? "Uploading..." : "Upload Post"}`}
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
    </>
  );
};

export default Layout;
