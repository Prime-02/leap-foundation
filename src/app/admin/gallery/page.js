"use client";
import { useGlobalState } from "@/app/GlobalProvider";
import FilePreview from "@/components/media/FilePreview";
import React, { useEffect, useState } from "react";
import { deleteFile } from "../../../../lib/appwrite";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";
import { Loader } from "@/components/Loader/Loader";

const page = () => {
  const { files, fetchFiles } = useGlobalState();
  const [deleting, setDeleting] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file to delete

  const Delete = async (fileId) => {
    setDeleting(`deleting-${fileId}`);
    try {
      await deleteFile(fileId);
      fetchFiles();
      toast.success("File deleted successfully!");
    } catch (error) {
      console.log("Error deleting file");
      toast.error("Failed to delete the file.");
    } finally {
      setDeleting(null);
      setSelectedFile(null); // Close the confirmation modal
    }
  };

  useEffect(() => {
    toast.info(
      "Images displayed here are used in the events page, please be cautious when deleting"
    );
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Gallery
      </h1>
      <section>
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          Total: {files?.length || 0}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files?.map((file) => (
            <li key={file.$id} className="relative rounded-lg h-[5odvh] overflow-hidden">
              {/* File Preview */}
              <FilePreview fileUrl={file.url} className={`h-full w-full`} />

              {/* Date Display */}
              <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-semibold rounded-md px-2 py-1 shadow">
                {new Date(file.$createdAt).toLocaleDateString()}
              </div>

              {/* Delete Button */}
              <div
                onClick={() => setSelectedFile(file)} // Open the confirmation modal
                className="absolute right-2 bottom-2 bg-green-100 text-green-800 cursor-pointer text-xs font-semibold rounded-md px-2 py-1 shadow"
              >
                <Trash size={15} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Confirmation Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this file?
            </h2>
            <p className="text-sm mb-6 text-gray-600">
              This action cannot be undone. The selected file will be
              permanently removed.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedFile(null)} // Close the modal
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => Delete(selectedFile.$id)} // Confirm delete
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                {deleting === `deleting-${selectedFile.$id}` ? (
                  <Loader smallerSize={true} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default page;
