'use client'
import { Blobs, LPServices } from "@/components/index/Index";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ServicesSection = () => {
   const [visibleBlobs, setVisibleBlobs] = useState([]);    
        
          // Randomly generate visible blobs with random positions
          useEffect(() => {
            const selectedBlobs = Blobs.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(Math.random() * Blobs.length)); // Random subset of blobs
            const positionedBlobs = selectedBlobs.map((blob) => ({
              src: blob,
              top: `${Math.random() * 80 + 5}%`, // Randomize top (5%-85% to avoid edges)
              left: `${Math.random() * 90 + 5}%`, // Randomize left (5%-95% to avoid edges)
            }));
            setVisibleBlobs(positionedBlobs);
          }, []);
        
  return (
    <section className="bg-gray-100 py-16 w-full h-auto min-h-screen flex items-center justify-center relative">
      <div className="absolute w-full h-full pointer-events-none overflow-hidden">
        {visibleBlobs.map((blob, i) => (
          <Image
            key={i}
            alt="blob"
            width={250}
            height={250}
            className={`absolute`}
            src={blob.src}
            style={{
              top: blob.top,
              left: blob.left,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12 z-10">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LPServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform z-10 duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
