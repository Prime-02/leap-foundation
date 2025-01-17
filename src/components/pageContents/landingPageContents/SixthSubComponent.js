import React from "react";
import { motion } from "framer-motion";
import { leapFoundationContent } from "@/components/index/Index";


const SixthSubComponent = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <main className="w-full flex flex-col items-center justify-center overflow-hidden py-16 px-5 bg-gray-50">
      {/* Title */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="text-3xl md:text-4xl font-bold text-green-800 mb-10 text-center"
      >
        {leapFoundationContent.testimonials.title}
      </motion.h2>

      {/* leapFoundationContent.Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl"
      >
        {leapFoundationContent.testimonials.quotes.map((quote, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <p className="text-gray-700 italic mb-4">"{quote.text}"</p>
            <p className="font-semibold text-green-900 text-sm">
              - {quote.author}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default SixthSubComponent;
