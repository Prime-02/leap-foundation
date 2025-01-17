import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Blobs, leapFoundationContent } from "@/components/index/Index";
import { Button } from "@/components/reusables/buttons/Buttons";
import { useRouter } from "next/navigation";
import Image from "next/image";


const ThirdSubComponent = () => {
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
    <section className="min-h-screen flex justify-center items-center bg-gray-100 overflow-hidden py-12 px-6 relative">
       <div className="absolute w-full h-full pointer-events-none">
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Section - Title and Image */}
        <motion.div
          className="flex flex-col bg-gray-100 items-center text-center lg:items-start lg:text-left"
          initial={{ opacity: 1, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            {leapFoundationContent.ourImpact.title}
          </h1>
          <motion.img
            src={leapFoundationContent.ourImpact.image}
            alt="Impact"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className="mt-4"
          >
            <Button text={"Reach Out To Us"} />
          </motion.span>
        </motion.div>

        {/* Right Section - Statistics and Success Story */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Statistics */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Key Statistics
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              {leapFoundationContent.ourImpact.statistics.map((stat, index) => (
                <li key={index} className="text-lg leading-relaxed">
                  {stat}
                </li>
              ))}
            </ul>
          </div>

          {/* Success Story */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              {leapFoundationContent.ourImpact.successStory.title}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {leapFoundationContent.ourImpact.successStory.story}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThirdSubComponent;
