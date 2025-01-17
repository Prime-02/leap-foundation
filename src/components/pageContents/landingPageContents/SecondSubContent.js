import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/reusables/buttons/Buttons";
import { Blobs, leapFoundationContent } from "@/components/index/Index";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SecondSubContent = () => {
  const [visibleBlobs, setVisibleBlobs] = useState([]);

  const nav = useRouter();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  // Randomly generate visible blobs with random positions
  useEffect(() => {
    const selectedBlobs = Blobs.sort(() => 0.5 - Math.random()).slice(
      0,
      Math.ceil(Math.random() * Blobs.length)
    ); // Random subset of blobs
    const positionedBlobs = selectedBlobs.map((blob) => ({
      src: blob,
      top: `${Math.random() * 80 + 5}%`, // Randomize top (5%-85% to avoid edges)
      left: `${Math.random() * 90 + 5}%`, // Randomize left (5%-95% to avoid edges)
    }));
    setVisibleBlobs(positionedBlobs);
  }, []);

  return (
    <main className="h-auto min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 relative">
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

      <motion.div
        className="max-w-4xl z-10 p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 1, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={leapFoundationContent.whyEducationMatters.image}
          alt="Education"
          className="w-full h-64 object-cover rounded-lg mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        />
        <motion.h1
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          {leapFoundationContent.whyEducationMatters.title}
        </motion.h1>
        <motion.p
          className="text-gray-700 mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        >
          {leapFoundationContent.whyEducationMatters.description}
        </motion.p>
        <motion.ul
          className="list-disc list-inside mb-6 text-gray-700 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        >
          {leapFoundationContent.whyEducationMatters.facts.map(
            (fact, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
              >
                {fact}
              </motion.li>
            )
          )}
        </motion.ul>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        >
          <Button
            text={leapFoundationContent.whyEducationMatters.callToAction}
          />
        </motion.span>
      </motion.div>
    </main>
  );
};

export default SecondSubContent;
