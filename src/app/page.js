"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LandingPageTexts } from "@/components";
import BG1 from '../../public/assets/toWEBP/img1.webp'
import BG2 from '../../public/assets/toWEBP/img2.webp'
import './masking.css'

const page = () => {
  return (
    <>
      <main className="h-screen bg-black flex justify-center items-center w-full md:hidden relative">
        <Image
          src={BG1}
          className="opacity-45"
          alt="Background Image"
          layout="fill"
          objectFit="cover" // Ensures the image covers the container
          priority // Ensures faster loading for this critical image
        />
        <section className="font-bold z-10 w-fit p-5">
          <div className="text-start text-white space-y-5 max-w-xl">
            <h1 className="text-4xl">{LandingPageTexts.heading}</h1>
            <p className="font-thin tracking-wide text-sm">
              {LandingPageTexts.subHeading}
            </p>
          </div>
        </section>
      </main>

      <main className="md:flex hidden flex-row justify-between items-center w-full h-screen ">
        <section className="h-full flex justify-center mr-5 w-1/2 items-center">
          <motion.div
            initial={{ translateX: -200 }}
            whileInView={{ translateX: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit text-start mx-auto space-y-5 max-w-xl"
          >
            <h1 className="text-4xl uppercase">
              {LandingPageTexts.heading.split(" ").slice(0, -4).join(" ")}
              <br />
              <span className="text-4xl bg-gradient-to-r from-amber-800 to-amber-900 text-transparent bg-clip-text font-extrabold">
                {LandingPageTexts.heading.split(" ").slice(-4).join(" ")}
              </span>
            </h1>

            <p className="text-sm font-bold tracking-tight">
              {LandingPageTexts.heading}
            </p>
          </motion.div>
        </section>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-1/2 flex items-center justify-center"
        >
          <Image
            src={BG2}
            alt=""
            className="w-full h-full object-cover  rounded-t-full"
          />
        </motion.div>
      </main>
    </>
  );
};

export default page;
