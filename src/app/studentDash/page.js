"use client";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Card from "../components/SDashboard/Card";

function page() {
  let [sName, setSName] = useState("Student");
  let [sMail, setSMail] = useState("123abc@example.com");
  let [mintScore, setMintScore] = useState(0);

  return (
    <>
      <main className="w-screen h-auto overflow-hidden flex flex-col items-center justify-center">
        <div className="w-5/6 mt-20 flex items-center justify-between gap-8">
          <span className="flex items-center justify-start">
            <FaRegUserCircle className="text-white text-7xl" />
            <span className="ml-4">
              <h1 className="gilroy-bold capitalize text-3xl text-white">
                welcome, {sName}
              </h1>
              <p className="gilroy-light text-sm text-white mt-2">{sMail}</p>
            </span>
          </span>
          <span className="flex flex-col items-end">
            <h1 className="gilroy-bold text-3xl text-white">Mint Score</h1>
            <p className="gilroy-light text-white">{mintScore}</p>
          </span>
        </div>

        <div className="w-5/6 mt-8 flex items-center justify-between gap-8 flex-wrap">
          <Card />
        </div>
      </main>
    </>
  );
}

export default page;
