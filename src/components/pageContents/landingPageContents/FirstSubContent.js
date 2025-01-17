import { Blobs, leapFoundationContent } from "@/components/index/Index";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/reusables/buttons/Buttons";
import { useRouter } from "next/navigation";

const FirstSubContent = () => {
 const [visibleBlobs, setVisibleBlobs] = useState([]);

  const nav = useRouter();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

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
    <main className="h-auto min-h-screen w-full flex items-center justify-center overflow-hidden px-5 py-16 bg-gray-50 relative">
      {/* Blob Images */}
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
        className="w-full md:w-[85%] lg:w-[75%] flex flex-col items-center gap-y-12 mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Mission and Vision Section */}
        <section className="flex flex-col gap-y-16 relative">
          {leapFoundationContent.missionAndVision.misionAndVionText.map(
            (text, i) => (
              <motion.div
                key={i}
                className={`flex flex-col-reverse md:flex-row ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center gap-8 bg-white p-6 rounded-lg shadow-lg`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                style={{
                  zIndex: 1, // Ensure it's above blobs
                  position: "relative", // Necessary for layering
                }}
              >
                {/* Text Section */}
                <motion.div
                  className="flex-1 text-center md:text-left md:px-6"
                  variants={containerVariants}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                    {text.heading}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 mb-6">
                    {text.text}
                  </p>
                  <div
                    className={`flex ${
                      i % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    } justify-center`}
                  >
                    <Button
                      text={text.cta.label}
                      reverse={i % 2 !== 0}
                      onClick={() => nav.push(text.cta.href)}
                    />
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  className="w-full max-w-[300px] md:max-w-[400px] flex-1"
                  variants={imageVariants}
                >
                  <Image
                    src={text.image1}
                    width={400}
                    height={400}
                    alt="mission and vision"
                    className="rounded-lg shadow-md"
                  />
                </motion.div>
              </motion.div>
            )
          )}
        </section>
      </motion.div>
    </main>
  );
};

export default FirstSubContent;
