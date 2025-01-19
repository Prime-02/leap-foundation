"use client";
import React from "react";
import { useGlobalState } from "../GlobalProvider";

const Page = () => {
  const { user } = useGlobalState();

  // If the user is still loading or not available yet
  if (!user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <h1>Welcome, {user.name || "User"}!</h1>
      <img
        src={user.avatar || "/default-avatar.png"} // Provide a fallback image
        alt="User Avatar"
        className="w-20 h-20 rounded-full"
      />
    </div>
  );
};

export default Page;
