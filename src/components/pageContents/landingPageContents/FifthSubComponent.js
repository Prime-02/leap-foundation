import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Blobs, leapFoundationContent } from "@/components/index/Index";
import Image from "next/image";

const FifthSubComponent = () => {
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
    <section className="min-h-screen flex overflow-hidden flex-col items-center relative justify-center bg-white py-16 px-6">
      <div className="absolute w-full h-full pointer-events-none ">
        {visibleBlobs.map((blob, i) => (
          <Image
            key={i}
            alt="blob"
            width={250}
            height={250}
            className={`absolute `}
            src={blob.src}
            style={{
              top: blob.top,
              left: blob.left,
              zIndex: 1, // Ensure it doesn't block text or images
            }}
          />
        ))}
      </div>
      <div className="max-w-6xl bg-inherit z-20 p-5 rounded-2xl mx-auto text-center mb-12">
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-green-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {leapFoundationContent.howYouCanHelp.title}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {leapFoundationContent.howYouCanHelp.callToAction}
        </motion.p>
      </div>

      {/* Ways to Help Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {leapFoundationContent.howYouCanHelp.waysToHelp.map((way, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 z-10 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.2,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              {way.name}
            </h2>
            <p className="text-gray-700">{way.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FifthSubComponent;
