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
    <div className="h-3/5 mt-16 w-screen bg-sky-200 border-b-2 border-gray-300 grid grid-cols-2">
      <div className="flex flex-col mt-32">
        <div className="flex justify-end">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 inline-block text-transparent bg-clip-text">
            TimelyTakeoff
          </h1>
        </div>
        <div className="container text-2xl font-semibold mt-10">
          <h1 className="ml-[384px] text-gray-600 py-4">Never miss</h1>
          <h1 className="ml-[500px] text-gray-500 py-4">your flight</h1>
          <h1 className="ml-[465px] text-gray-400 py-4">again!</h1>
        </div>
        <Button
          onClick={() => handleClick()}
          className="ml-[470px] mt-6 w-32 h-12 bg-white text-sky-300"
        >
          Get Started
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src="/images/timelytakeoff.png"
          alt="TimelyTakeoff"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};
export default Hero;
