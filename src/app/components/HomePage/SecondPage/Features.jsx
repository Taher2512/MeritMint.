import React from "react";

function Features() {
  return (
    <>
      <h1 className="gilroy-bold text-slate-300 text-6xl text-center font-bold mt-20 mb-20">
        Features
      </h1>
      <div className="h-96 grid grid-cols-3 px-40 gap-16 w-screen mb-40">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center py-16 px-16">
          <h1 className="gilroy-bold text-slate-300 text-2xl white mb-10">
            Secure and Transparent
          </h1>
          <p className="gilroy-light text-slate-300 text-lg ">
            Built on blockchain technology, MeritMint ensures that every reward
            is secure, transparent, and tamper-proof
          </p>
        </div>
        <div className="bg-blue-700/30 border-2 border-blue-700 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center py-16 px-16">
          <h1 className="gilroy-bold text-slate-300 text-2xl white mb-10">
            Inclusive & Accessible
          </h1>
          <p className="gilroy-light text-slate-300 text-lg ">
            MeritMint is designed for everyone. Whether you're a student,
            teacher, or educational institution, our platform is easy to use and
            fully accessible.
          </p>
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center py-16 px-16">
          <h1 className="gilroy-bold text-slate-300 text-2xl white mb-10">
            Customizable Rewards
          </h1>
          <p className="gilroy-light text-slate-300 text-lg ">
            With MeritMint, rewards are not one-size-fits-all. Customize the
            rewards to fit educational goals, personal interests, and
            institutional values.
          </p>
        </div>
      </div>
    </>
  );
}

export default Features;
