'use client'

import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="w-full h-auto min-h-screen flex items-center justify-center px-5 bg-gray-100">
      <div className="flex flex-col md:w-[75%] mx-auto border-b py-8 w-full items-center justify-center bg-white rounded-lg shadow-lg px-3">
        {/* Hero Section */}
        <div className="w-full h-[50dvh] rounded-3xl overflow-hidden flex items-center justify-center relative bg-black">
          <Image
            src={"/assets/toWEBP/img (29).webp"}
            alt="Leap Foundation"
            width={500}
            height={500}
            className="object-cover opacity-50 w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-lg md:text-xl mt-2">
              We’d love to hear from you! Reach out to Leap Foundation today.
            </p>
          </div>
        </div>

        {/* Contact Form and Details */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between mt-10 px-5 md:px-10">
          {/* Contact Form */}
          <div className="w-full md:w-[60%]">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
              Send us a message
            </h2>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted! We will get back to you shortly.");
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Write your message here"
                  rows={5}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white font-medium py-3 rounded-md hover:bg-green-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="w-full md:w-[35%] mt-10 md:mt-0">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
              Contact Details
            </h2>
            <p className="text-gray-600">
              Reach out to us using any of the details below, and we’ll be happy
              to assist you!
            </p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                  📍
                </span>
                <p className="text-gray-700">
                  Leap Foundation, 123 Foundation Lane, New York, NY 10001
                </p>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                  📧
                </span>
                <p className="text-gray-700">info@leapfoundation.org</p>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                  📞
                </span>
                <p className="text-gray-700">+1 (123) 456-7890</p>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                  🌐
                </span>
                <a
                  href="https://leapfoundation.org"
                  className="text-green-500 hover:underline"
                >
                  www.leapfoundation.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
