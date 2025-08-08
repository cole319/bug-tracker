import React from "react";
import Image from "next/image";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function Header() {
  const theme = "light";
  return (
    <section className="py-[1rem] md:py-[3rem] px-[1rem] sm:px-[2rem] md:px-[8rem] flex justify-between items-center">
      <h1 className="font-logo-primary text-[2rem] font-[900] text-text-secondary flex items-center">
        <span className="font-logo-primary text-[4rem] font-[900] text-accent-logo">
          X
        </span>
        BUGS
      </h1>

      <div className="flex justify-center items-center gap-[2rem] text-[2rem] text-text-secondary">
        <button className="cursor-pointer">
          {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
        </button>

        <Image
          src="/user.png"
          height={40}
          width={40}
          alt="user icon"
          className="rounded-full"
        />
      </div>
    </section>
  );
}
