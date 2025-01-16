"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BG1 from '../../public/assets/toWEBP/img1.webp'
import BG3 from '../../public/assets/toWEBP/img9.webp'
import Blob from '../../public/assets/svg/bob1.svg'
import { LandingPageTexts } from "@/components/index/Index";

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
            initial={{ translateX: -600 }}
            whileInView={{ translateX: 0 }}
            transition={{ duration: 1 }}
            className="w-fit text-start mx-auto space-y-2 max-w-xl"
          >
            <h1 className="text-4xl uppercase">
              {LandingPageTexts.heading.split(" ").slice(0, -4).join(" ")}
              <br />
              <span className="text-4xl bg-gradient-to-r from-green-800 to-green-900 text-transparent bg-clip-text font-extrabold relative">
                {LandingPageTexts.heading.split(" ").slice(-4).join(" ")}
                {/* <Image
                src={Blob}
                alt=""
                className="absolute rotate-45 top-0"
                width={100}
                height={100}
                /> */}
              </span>
            </h1>

            <p className="text-lg tracking-tight">
              {LandingPageTexts.subHeading}
            </p>
          </motion.div>
        </section>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-1/2 relative flex items-center justify-center mask1"
        >
          <Image
          src={BG3}
          alt=""
          className="w-full h-full"
          />
        </motion.div>
      </main>
    </>
  );
};

export default page;
