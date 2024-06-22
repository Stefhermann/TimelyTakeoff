import FlightForm from "@/components/flight-form/flightform";
import Image from "next/image";

const FlightsPage = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="relative w-full">
        <div className="absolute -z-10 w-full">
          <Image
            src="/images/FlightBackground.jpg"
            alt="Flight"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
    </main>
  );
};

export default FlightsPage;
