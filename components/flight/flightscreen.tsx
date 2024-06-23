"use client";

import Image from "next/image";

const FlightScreen = () => {
  return (
    <main className="w-[1000px] h-[380px] mt-[80px] bg-transparent shadow-2xl rounded-full">
      <div className="flex w-full h-14 bg-sky-400 rounded-xl justify-center items-center border-b-2 border-dotted border-gray-300">
        <h1 className="text-sky-300 text-opacity-50 font-bold text-4xl tracking-[1em]">
          Plane Ticket
        </h1>
      </div>
      <div className="grid grid-cols-3 rounded-xl bg-white h-[325px]">
        <div className="col-span-2 mx-8 mt-6">Hello World</div>
        <div className="col-span-1 flex border-l-2 border-dotted">
          <Image
            src="/images/PlaneTicket.png"
            alt="Airplane"
            className="fixed mt-24 ml-8"
            width={250}
            height={250}
          />
        </div>
      </div>
    </main>
  );
};

export default FlightForm;
