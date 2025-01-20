"use client";
import { LeapFoundationEvents } from "@/components/index/Index";
import React, { useEffect } from "react";
import { useGlobalState } from "../GlobalProvider";
import FilePreview from "@/components/media/FilePreview";

const EventsPage = () => {
  const { posts, fetchPosts } = useGlobalState();  
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-12">
          Leap Foundation Events
        </h1>
        <div className="space-y-16">
          {posts.map((event, index) => {
            console.log(event?.fileUrl);
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="w-full lg:w-1/2">
                  {event?.fileUrl ? (
                    <FilePreview fileUrl={event?.fileUrl} />
                  ) : event?.fileUrl ? (
                    <FilePreview fileUrl={event?.fileUrl} />
                  ) : null}
                </div>

                <div className="w-full lg:w-1/2">
                  <h3 className="text-3xl font-bold text-green-800 mb-4">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
