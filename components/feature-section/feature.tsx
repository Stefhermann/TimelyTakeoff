"use client";

import Image from "next/image";
import {
  TriangleAlert,
  TvMinimal,
  CircleCheck,
  CircleAlert,
} from "lucide-react";

const Feature = () => {
  return (
    <section id="features" className="flex flex-col items-center">
      <h1 className="font-bold mt-14 text-3xl text-sky-900">
        Packed with Features
      </h1>
      <div className="grid grid-cols-4 w-screen gap-4 mt-10 text-sky-950">
        <div className="flex flex-col items-center mt-2">
          <Image
            src="/images/flightinformation.jpeg"
            alt="Flight Information Image"
            width={200}
            height={200}
          />
          <h1 className="font-semibold">Flight Information</h1>
          <p className="text-center mx-12">
            Get real-time flight information at your fingertips.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex mt-8">
            <CircleCheck className="h-32 w-32 text-slate-700" />
            <CircleAlert className="h-32 w-32 text-slate-700" />
          </div>
          <h1 className="font-semibold mt-4">Delay Predictions</h1>
          <p className="text-center mx-10">
            Get notified about potential delays and cancelations before they
            happen.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <TriangleAlert className="h-32 w-32 text-slate-700 mt-8" />
          <h1 className="font-semibold mt-4">Personalized Alerts</h1>
          <p className="text-center mx-12">
            Receive personalized alerts based on your flight status.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <TvMinimal className="h-32 w-32 text-slate-700 mt-8" />
          <h1 className="font-semibold mt-4">Simplistic Interface</h1>
          <p className="text-center mx-12">
            Our simplistic interface makes it easy to navigate and use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feature;
