"use client";

import FlightForm from "@/components/flight/flightform";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CloudOff } from "lucide-react";

import { useRouter } from "next/navigation";

const FlightsPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center">
      <Image
        src="/images/FlightBackground.jpg"
        alt="Flight"
        className="-z-10"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <Button
        onClick={() => handleClick()}
        className="mt-14 bg-transparent hover:bg-transparent"
      >
        <CloudOff className="text-slate-400 hover:text-slate-800 h-12 w-12" />
      </Button>
      <FlightForm />
    </main>
  );
};

export default FlightsPage;
