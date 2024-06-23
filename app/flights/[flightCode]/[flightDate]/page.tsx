import Image from "next/image";
import axios from "axios";

import FlightScreen from "@/components/flight/flightscreen";

const FlightPage = async ({
  params,
}: {
  params: { flightCode: string; flightDate: string };
}) => {
  // Fetch flight data

  const res = await axios.get(
    "http://127.0.0.1:8000/flights/" +
    params.flightCode +
    "/" +
    params.flightDate,
  );
  const flight = res.data.flight;
  const x_list = res.data.x_list;

  const predictions = await axios.post("http://127.0.0.1:8000/predict", {
    features: x_list,
  });

  console.log(predictions.data);

  return (
    <main>
      <Image
        src="/images/FlightBackground.jpg"
        alt="Flight Background"
        className="-z-10"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <FlightScreen flight={flight} predictions={predictions.data} />
    </main>
  );
};

export default FlightPage;
