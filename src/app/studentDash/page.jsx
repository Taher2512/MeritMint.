"use client";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Card from "../components/SDashboard/Card";
import BasicArea from "../components/SDashboard/LineChart";
function page() {
  let [sName, setSName] = useState("Student");
  let [sMail, setSMail] = useState("123abc@example.com");
  let [mintScore, setMintScore] = useState(0);

  return (
    <>
      <main className="w-screen h-auto overflow-hidden flex flex-col items-center justify-center pt-8 gap-8">
        <FaRegUserCircle className="text-white text-7xl" />
        <span className="ml-4 flex flex-col items-center justify-center">
          <h1 className="gilroy-bold capitalize text-3xl text-white">
            welcome, {sName}
          </h1>
          <p className="gilroy-light text-sm text-white mt-2">{sMail}</p>
        </span>

        {/* <div className="w-5/6 mt-8 flex items-center justify-start gap-8 flex-wrap">
          
        </div> */}
        <span className="flex gap-16 w-screen px-60 mt-10 z-10">
          <BasicArea />
          <div className="w-full bg-gray-500/50 border-2 border-blue-500 flex flex-col items-center justify-between pt-8 pb-16 px-6 rounded-lg z-10">
            <h1 className="gilroy-bold text-4xl text-white">Mint Score</h1>
            <div className=" w-60 h-60 border-4 border-blue-500 rounded-full flex items-center justify-center">
              <h1 className="gilroy-bold text-4xl text-white">100</h1>
            </div>
            <div className="border-t-2 w-full"></div>
          </div>
        </span>
        <div className="w-full px-60 z-10">
          <div className="w-full bg-gray-500/50 border-2 border-blue-500 flex flex-col items-center justify-between py-8 px-6 rounded-lg z-10">
            <h1 className="gilroy-bold text-4xl text-white">
              Flo Tokens Earned
            </h1>
            <h1 className="text-white text-3xl mt-8">123</h1>
          </div>
        </div>
      </main>
      <div className="circle absolute top-0 z-0 "></div>
      <div className="circle absolute top-80 left-10 z-0"></div>
      <div className="circle absolute top-60 right-40 z-0"></div>
      <div className="circle absolute top-96 right-20 z-0"></div>
      <div className="circle absolute -bottom-20 left-60 z-0"></div>
    </>
  );
}

export default page;
