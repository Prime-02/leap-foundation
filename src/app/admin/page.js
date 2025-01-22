"use client";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../GlobalProvider";
import FilePreview from "@/components/media/FilePreview";
import { Edit, Trash } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import { deleteEvent, updateField } from "../../../lib/appwrite";
import { Textinput } from "@/components/inputs/Textinput";
import { Button } from "@/components/reusables/buttons/Buttons";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader/Loader";

const Page = () => {
  const { posts, user, fetchPosts, fetchUser } = useGlobalState(); // Add `fetchPosts` to refresh data
  const [currPage, setCurrPage] = useState(true);
  const [modal, setModal] = useState(false);
  const [docId, setDocId] = useState(null);
  const [docType, setDocType] = useState(null);
  const [docValue, setDocValue] = useState(""); // Store value to edit
  const [selectedFile, setSelectedFile] = useState(null); // Store selected file
  const [loading, setLoading] = useState(null);

  // Function to open the modal for editing
  const openEditModal = (id, type, value) => {
    setDocId(id);
    setDocType(type);
    setDocValue(value);
    setSelectedFile(null); // Reset file selection
    setModal(true);
  };

  
    useEffect(() => {
      fetchUser();
    }, [fetchUser]);
  
    // If the user is still loading or not available yet
    if (!user) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader/>
        </div>
      );
    }

  // Function to handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const DeleteEvent = async (id) => {
    setLoading("deleting"); // Set loading to true during delete
    try {
      await deleteEvent(id);
      fetchPosts(); // Refresh posts after delete
    } catch (error) {
      console.log("Error deleting event:", error);
    } finally {
      setLoading(null); // Reset loading once operation is complete
    }
  };

  // Function to handle updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!docId || !docType) return;

    setLoading(docType);
    try {
      if (docType === "fileUrl") {
        if (!selectedFile) return toast.info("Please select a file to upload.");

        // Upload the file using the updateField function
        await updateField(docId, "fileUrl", null, selectedFile); // Update with the selected file
      } else if (docValue.trim()) {
        await updateField(docId, docType, docValue); // Update with the docValue
      }

      setModal(false); // Close modal after successful update
      fetchPosts(); // Refresh posts to reflect changes
    } catch (error) {
      console.error("Failed to update post:", error.message);
    } finally {
      setLoading(null); // Reset loading once operation is complete
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="w-full min-h-16 flex items-start justify-between pt-5 flex-col bg-white shadow-md">
                  <h1 className="text-4xl text-center font-extrabold w-full text-green-800 mb-12">
                    Events
                  </h1>
        <div className="w-full justify-around flex items-center">
        <div
          className={`cursor-pointer text-lg font-semibold ${
            !currPage ? "text-green-800" : "text-gray-500"
            }`}
            onClick={() => setCurrPage(false)}
            >
          All Posts
        </div>
        <div
          className={`cursor-pointer text-lg font-semibold ${
            currPage ? "text-green-800" : "text-gray-500"
            }`}
            onClick={() => setCurrPage(true)}
            >
          Your Posts
        </div>
          </div>
        <span
          className={` w-1/2 h-1 rounded-full bg-green-800 bottom-0 left-0 transition-transform duration-500 
            ${currPage ? "translate-x-full" : "translate-x-0"}`}
        ></span>
      </nav>

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-6 lg:px-12 md:w-[75%]">
          <h1 className="text-4xl font-extrabold text-center text-green-800 mb-12">
            {currPage
              ? "Your Leap Foundation Events"
              : "All Leap Foundation Events"}
          </h1>

          <div className="space-y-16">
            {posts
              .filter((event) =>
                currPage ? event.admin?.$id === user?.$id : true
              )
              .map((event, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8`}
                >
                  {/* Media Section */}
                  <div className="w-full lg:w-1/2 rounded-2xl relative">
                    {currPage && event.admin?.$id === user?.$id && (
                      <span
                        className="absolute top-2 left-3 text-green-800 bg-green-200 rounded-full w-8 h-8 justify-center items-center flex cursor-pointer"
                        onClick={() =>
                          openEditModal(event?.$id, "fileUrl", event.fileUrl)
                        }
                      >
                        <Edit size={15} />
                      </span>
                    )}
                    <FilePreview fileUrl={event.fileUrl} />
                  </div>

                  {/* Text Section */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex justify-between items-center relative">
                      <h3 className="text-3xl font-bold text-green-800 mb-4">
                        {event.title}
                      </h3>
                      {currPage && event.admin?.$id === user?.$id && (
                        <span
                          className="top-2 left-3 text-green-800 bg-green-200 rounded-full w-8 h-8 justify-center items-center flex cursor-pointer"
                          onClick={() =>
                            openEditModal(event?.$id, "title", event.title)
                          }
                        >
                          <Edit size={15} />
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-5 relative">
                      {event.desc}
                      {currPage && event.admin?.$id === user?.$id && (
                        <span
                          className="top-2 left-3 text-green-800 bg-green-200 rounded-full w-8 h-8 justify-center items-center flex cursor-pointer"
                          onClick={() =>
                            openEditModal(event?.$id, "desc", event.desc)
                          }
                        >
                          <Edit size={18} />
                        </span>
                      )}
                    </p>
                    {currPage && event.admin?.$id === user?.$id && (
                      <Button
                        text={loading === "fileUrl" ? "Deleting..." : "Delete"}
                        icon={<Trash size={15} />}
                        onClick={() => DeleteEvent(event?.$id)}
                        disabled={loading === "fileUrl"} // Disable delete if fileUrl update is in progress
                        loading={loading === "deleting"}
                      />
                    )}
                  </div>
                </div>
              ))}

            {/* No Posts Fallback */}
            {posts.filter((event) =>
              currPage ? event.admin?.$id === user?.$id : true
            ).length === 0 && (
              <p className="text-center text-gray-600 text-lg">
                {currPage
                  ? "You haven't created any events yet."
                  : "No events available at the moment."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      <Modal
        onClose={() => setModal(false)}
        isOpen={modal}
        title={`Update ${docType}`}
        buttonValue={'Update'}
        disabled={loading}
        loading={loading}
        onSubmit={handleUpdate}
      >
        {docType === "fileUrl" ? (
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        ) : (
          <Textinput
            type="text"
            className="w-full p-2 border rounded-md"
            value={docValue}
            changed={(e) => setDocValue(e.target.value)}
            label={`Enter new ${docType}`}
            labelStyle={"bg-white"}
          />
        )}
      </Modal>
    </>
  );
};

export default Page;
