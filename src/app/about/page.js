"use client";
import React from "react";
import { AboutLeapFoundation } from "@/components/index/Index";
import { motion } from "framer-motion";
import BG3 from "../../../public/assets/toWEBP/img (9).webp";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <header className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {AboutLeapFoundation.title}
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            {AboutLeapFoundation.mission}
          </p>
        </div>
      </header>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Our Vision</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            {AboutLeapFoundation.vision}
          </p>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
            Core Focus Areas
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {AboutLeapFoundation.coreFocusAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 border border-green-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Our Impact</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            {AboutLeapFoundation.impact}
          </p>
        </div>
      </section>

      {/* Why We Do It Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Why We Do It
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            {AboutLeapFoundation.whyWeDoIt}
          </p>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Involved</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {AboutLeapFoundation.getInvolved.map((involvement, index) => (
              <motion.div
                key={index}
                className="bg-white text-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -10 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  {involvement.title}
                </h3>
                <p className="text-gray-600">{involvement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 flex flex-col items-center">
          {/* Image Section */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full md:w-1/2 relative flex items-center justify-center overflow-hidden rounded-lg shadow-lg mb-8"
          >
            <Image
              src={BG3}
              alt="Inspiring Image"
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
          {/* Closing Note Text */}
          <p className="text-lg text-center max-w-3xl">
            {AboutLeapFoundation.closingNote}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
