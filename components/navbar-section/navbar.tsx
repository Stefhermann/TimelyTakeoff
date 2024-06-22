"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const NavBar = () => {
  return (
    <nav className="fixed mx-auto top-0 left-0 right-0 z-10 h-[64px] w-screen bg-white flex justify-between border-b-2 border-gray-300">
      <h1 className="mt-5 mx-4 text-sky-800 font-bold">TimelyTakeoff</h1>
      <div className="flex mt-[22px] text-sm text-sky-300">
        <Separator orientation="vertical" className="h-1/2" />
        <Link href="#features" className="mx-8 hover:text-sky-500">
          Features
        </Link>
        <Separator orientation="vertical" className="h-1/2" />
        <Link href="#guide" className="mx-8 hover:text-sky-500">
          Guide
        </Link>
        <Separator orientation="vertical" className="h-1/2" />
        <Link href="#contact" className="mx-8 hover:text-sky-500">
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
