import Image from "next/image";
import React from "react";


const page = () => {
  return <main className="w-full h-auto min-h-screen flex items-center justify-center px-5">
    <div className="flex flex-col md:w-[75%] mx-auto  border-b py-8 w-full items-center justify-center">
        <div className="w-full h-[50dvh] rounded-3xl overflow-hidden flex items-center justify-center relative bg-black">
          <Image
          src={'/assets/toWEBP/img (29).webp'}
          alt=""
          width={500}
          height={500}
          className="object-cover opacity-35 w-full h-full"
          />
        </div>
        <div></div>
    </div>
  </main>;
};

export default page;
