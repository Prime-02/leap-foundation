import Image from "next/image";
import React, { useEffect, useState } from "react";

const FilePreview = ({ fileUrl, className }) => {
  const [fileType, setFileType] = useState(null); // Either "image", "video", or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const determineFileType = async () => {
      try {
        const response = await fetch(fileUrl, { method: "HEAD" });
        const contentType = response.headers.get("Content-Type");

        if (contentType.startsWith("image/")) {
          setFileType("image");
        } else if (contentType.startsWith("video/")) {
          setFileType("video");
        } else {
          setFileType("unknown");
        }
      } catch (error) {
        console.error("Error determining file type:", error);
        setFileType("unknown");
      } finally {
        setLoading(false);
      }
    };

    determineFileType();
  }, [fileUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (fileType === "image") {
    return (
      <Image
        src={fileUrl}
        width={400}
        height={400}
        alt="Media Preview"
        className={`object-cover border rounded-lg ${className}`}
      />
    );
  }

  if (fileType === "video") {
    return (
      <video controls className={`w-full h-auto rounded-lg ${className}`}>
        <source src={fileUrl} type="video/mp4" />
        <source src={fileUrl} type="video/webm" />
        <source src={fileUrl} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return <p>Unsupported file type.</p>;
};

export default FilePreview;
