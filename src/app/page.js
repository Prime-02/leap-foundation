"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BG1 from "../../public/assets/toWEBP/img (1).webp";
import BG3 from "../../public/assets/toWEBP/img (9).webp";
import { Blobs, LandingPageTexts } from "@/components/index/Index";
import { MessageCircleQuestion, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import FirstSubContent from "@/components/pageContents/landingPageContents/FirstSubContent";
import SecondSubContent from "@/components/pageContents/landingPageContents/SecondSubContent";
import ThirdSubComponent from "@/components/pageContents/landingPageContents/ThirdSubComponent";
import FourthSubComponent from "@/components/pageContents/landingPageContents/FourthSubComponent";
import FifthSubComponent from "@/components/pageContents/landingPageContents/FifthSubComponent";
import { Button } from "@/components/reusables/buttons/Buttons";
import SixthSubComponent from "@/components/pageContents/landingPageContents/SixthSubComponent";

const page = () => {
  const nav = useRouter();

  return (
    <>
      {/* Mobile View */}
      <main className="h-screen overflow-x-hidden bg-black flex justify-center items-center w-full md:hidden relative">
        <Image
          src={BG1}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
          className="absolute top-0 left-0 w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
        <section className="font-bold z-20 w-fit p-5">
          <div className="text-start text-white space-y-5 max-w-xl">
            <h1 className="text-4xl">{LandingPageTexts.heading}</h1>
            <p className="font-light tracking-wide text-sm">
              {LandingPageTexts.subHeading}
            </p>
          </div>
          <div className="flex flex-col gap-y-1 mt-4 gap-x-4">
            <Button
              onClick={() => nav.push("/about")}
              text="Want To Know More about Us"
              clasName={"w-fit"}
              icon={<MessageCircleQuestion />}
            />
            <Button
              reverse
              onClick={() => nav.push("/events")}
              text="View Past Events"
              clasName={"w-fit"}
              icon={<PlayCircle />}
            />
          </div>
        </section>
      </main>

      {/* Desktop View */}
      <main className="hidden md:flex flex-row py-12 justify-center items-center w-full h-screen">
        {/* Text Section */}
        <section className="h-full flex justify-center mr-5 items-center px-10 relative">
          <Image
            src={Blobs[1]}
            alt=""
            width={300}
            height={300}
            className="absolute top-0 right-0 "
          />
          <Image
            src={Blobs[4]}
            alt=""
            width={300}
            height={300}
            className="absolute right-0 -z-10 bottom-0 "
          />
          <motion.div
            initial={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 max-w-lg z-10 relative"
          >
            <h1 className="text-5xl font-bold uppercase mix-blend-overlay relative z-10">
              {LandingPageTexts.heading.split(" ").slice(0, -4).join(" ")}
              <br />
              <span className="bg-gradient-to-r from-green-800 to-green-900 text-transparent bg-clip-text">
                {LandingPageTexts.heading.split(" ").slice(-4).join(" ")}
              </span>
            </h1>
            <p className="text-lg tracking-wide text-gray-700 relative z-10">
              {LandingPageTexts.subHeading}
            </p>
            <div className="flex gap-x-4 relative z-10">
              <Button
                onClick={() => nav.push("/about")}
                text="Want To Know More about Us"
                icon={<MessageCircleQuestion />}
              />
              <Button
                reverse
                onClick={() => nav.push("/events")}
                text="View Past Events"
                icon={<PlayCircle />}
              />
            </div>
          </motion.div>
        </section>

        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full w-1/2 relative flex items-center justify-center rounded-r-full overflow-hidden bg-black"
        >
          <Image
            src={BG3}
            alt="Inspiring Image"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </main>

      {/* Sub-Content Sections */}
      <FirstSubContent />
      <SecondSubContent />
      <ThirdSubComponent />
      <FourthSubComponent />
      <FifthSubComponent />
      <SixthSubComponent />
    </>
  );
};

export default page;
