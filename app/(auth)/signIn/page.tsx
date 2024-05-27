"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import logo from "@/public/assets/images/logo2.png";
import Carousel from "@/components/ui/carousel";
import bgImage from "@/public/assets/images/bg8.jpg"; // Ensure this path correctly points to your background image

export default function Login() {
  const [userAD, setUserAD] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen flex flex-col "
      style={{ position: "relative" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2, // Adjust this value to control the opacity
          zIndex: -1,
        }}
      ></div>
      <header className="w-full py-6 px-8 bg-mandiriBlue-950 flex justify-between items-center">
        <img src={logo.src} alt="Bank Mandiri Logo" className="h-12" />
        <div className="text-white">
          Indonesia | Tentang Kami | Hubungi Kami | ID | EN
        </div>
      </header>
      <div className="flex items-center justify-center flex-1 px-8">
        <div className="bg-white rounded-lg shadow-xl flex overflow-hidden w-full max-w-4xl">
          {/* Carousel Component on the left side */}
          <div className="w-1/2 min-w-[300px] px-8 flex justify-center items-center">
            <Carousel />
          </div>
          {/* Login form on the right side */}
          <div className="flex flex-col p-8 w-1/2 max-w-md">
            <h2 className="text-lg font-semibold text-mandiriBlue-950  mb-6">
              Sign In
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="userAD"
                  className="block text-sm font-medium text-mandiriGrey"
                >
                  User AD
                </label>
                <input
                  type="text"
                  id="userAD"
                  className="mt-1 block w-full px-3 py-2 bg-mandiriWhite border border-mandiriGrey rounded-md shadow-sm focus:ring-mandiriBlue-950  focus:border-mandiriBlue-950 "
                  value={userAD}
                  onChange={(e) => setUserAD(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-mandiriGrey"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 bg-mandiriWhite border border-mandiriGrey rounded-md shadow-sm focus:ring-mandiriBlue-950  focus:border-mandiriBlue-950 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                onClick={() =>
                  signIn("credentials", {
                    userAD,
                    password,
                    redirect: true,
                    callbackUrl: "/",
                  })
                }
                disabled={!userAD || !password}
                className="w-full bg-mandiriYellow-400 hover:bg-mandiriYellow-500 text-mandiriBlue-950  font-semibold py-2 px-4 rounded"
              >
                Sign In
              </button>
            </div>
            <p className="mt-8 text-center text-sm text-mandiriGrey">
              Don’t have an account?{" "}
              <a href="/signUp" className="text-mandiriBlue-950  underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <footer className="w-full py-6 px-8 bg-mandiriBlue-950  text-right text-sm text-white">
        ©{new Date().getFullYear()} PT Bank Mandiri Persero Tbk. All rights
        reserved.
      </footer>
    </div>
  );
}
