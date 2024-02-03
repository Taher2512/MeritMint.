import Image from "next/image";
import Navbar from "./components/HomePage/foreground/Navbar";
import HeroHeading from "./components/HomePage/foreground/HeroHeading";
import ParticleRing from "./components/HomePage/background/ParticleRing";
import Steps from "./components/HomePage/SecondPage/Steps";
import Features from "./components/HomePage/SecondPage/Features";

export default function Home() {
  return (
    <>
    <main className="bg-[#0F172A] overflow-hidden">
        <div className="relative h-auto w-screen z-0">
          <ParticleRing />
          <div id="foreGround" className="absolute h-screen w-screen top-0 z-1">
            <Navbar />
            <HeroHeading />
          </div>
        </div>
        <Steps/>
        <Features/>
        
      </main>
    </>
  );
}
