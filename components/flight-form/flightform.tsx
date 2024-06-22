"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  flightCode: z.string().min(1, {
    message: "Flight code is required",
  }),
  Date: z.string().date().min(1, {
    message: "Date is required",
  }),
});

const FlightForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightCode: "",
      Date: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="flightCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flight Code</FormLabel>
              <FormControl>
                <Input placeholder="ex. DL605" {...field} />
              </FormControl>
              <FormDescription>Please enter your flight code.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
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
        <Button type="submit">Find Flight</Button>
      </form>
    </Form>
  );
};

export default FlightForm;
