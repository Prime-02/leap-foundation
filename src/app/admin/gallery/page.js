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

  const Delete = async (fileId) => {
    setDeleting(`deleting-${fileId}`);
    try {
      await deleteFile(fileId);
      fetchFiles();
    } catch (error) {
      console.log("Error deleting file");
    }
  };
  useEffect(() => {
    toast.info("Images displayed here are used in events and services, please be cautious when deleting");
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
            <li key={file.$id} className="relative rounded-lg overflow-hidden">
              {/* File Preview */}
              <FilePreview fileUrl={file.url} />

              {/* Date Display */}
              <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-semibold rounded-md px-2 py-1 shadow">
                {new Date(file.$createdAt).toLocaleDateString()}
              </div>
              <div
                onClick={() => Delete(file.$id)}
                className="absolute right-2 bottom-2 bg-green-100 text-green-800 cursor-pointer text-xs font-semibold rounded-md px-2 py-1 shadow"
              >
                {deleting === `deleting-${file.$id}` ? (
                  <Loader smaillerSize={true} />
                ) : (
                  <Trash size={15} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default page;
