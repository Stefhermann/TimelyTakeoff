"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  flightCode: z.string().min(1, {
    message: "Flight code is required",
  }),
  date: z.string().date().min(1, {
    message: "Date is required",
  }),
});

const FlightForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightCode: "",
      date: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      router.push("flights/" + values.flightCode + "/" + values.date);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-[1000px] h-[380px] mt-[80px] bg-transparent shadow-2xl rounded-full">
      <div className="flex w-full h-14 bg-sky-400 rounded-xl justify-center items-center border-b-2 border-dotted border-gray-300">
        <h1 className="text-sky-300 text-opacity-50 font-bold text-4xl tracking-[1em]">
          Plane Ticket
        </h1>
      </div>
      <div className="grid grid-cols-3 rounded-xl bg-white h-[325px]">
        <div className="col-span-2 mx-8 mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 text-sky-800"
            >
              <FormField
                control={form.control}
                name="flightCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Flight Code
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ex. DL605" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter your flight code.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">Date</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter the date of your flight.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-sky-300 text-opacity-50 text-sky-900 hover:text-sky-300 hover:bg-sky-100"
              >
                Find Flight
              </Button>
            </form>
          </Form>
        </div>
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
