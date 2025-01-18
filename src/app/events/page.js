import { LeapFoundationEvents } from "@/components/index/Index";
import React from "react";

const EventsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-12">
          Leap Foundation Events
        </h1>
        <div className="space-y-16">
          {LeapFoundationEvents.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8`}
            >
              {/* Media Section */}
              <div className="w-full lg:w-1/2">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-lg shadow-lg object-cover w-full h-64"
                  />
                ) : event.video ? (
                  <video
                    src={event.video}
                    controls
                    className="rounded-lg shadow-lg object-cover w-full h-64"
                  />
                ) : null}
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold text-green-800 mb-4">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
