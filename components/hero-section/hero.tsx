"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/flights");
  };

  return (
    <div className="h-3/5 mt-16 w-screen bg-sky-300 border-b-2 border-gray-300 grid grid-cols-2">
      <div className="flex flex-col mt-32">
        <div className="flex justify-end">
          <h1 className="text-6xl tracking-widest font-bold bg-gradient-to-r from-blue-900 to-blue-400 inline-block text-transparent bg-clip-text">
            TimelyTakeoff
          </h1>
        </div>
        <div className="container text-2xl font-semibold mt-10">
          <h1 className="ml-[360px] text-gray-600 py-4 tracking-wider">
            Never miss
          </h1>
          <h1 className="ml-[500px] text-gray-500 py-4 tracking-wide">
            your flight
          </h1>
          <h1 className="ml-[450px] text-gray-400 py-4">again!</h1>
        </div>
        <Button
          onClick={() => handleClick()}
          className="ml-[450px] mt-6 w-32 h-12 bg-white text-sky-300"
        >
          Get Started
        </Button>
      </div>
      <div className="flex mt-24 mx-44 justify-center items-center rounded-full bg-sky-500 h-[400px] w-[400px]">
        <Image
          src="/images/PlaneTicket.png"
          alt="TimelyTakeoff"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};
export default Hero;
