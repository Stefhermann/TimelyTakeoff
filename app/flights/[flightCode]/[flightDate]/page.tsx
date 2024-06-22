import Image from "next/image";
import axios from "axios";

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
  console.log(res.data);

  return (
    <main>
      <Image
        src="/images/FlightBackground.jpg"
        alt="Flight"
        className="-z-10"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <h1>Flight {params.flightCode}</h1>
    </main>
  );
};

export default FlightPage;
