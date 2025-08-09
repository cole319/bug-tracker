"use client";
import React from "react";
import Image from "next/image";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { toggleTheme } from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/stores/storeHooks";
import useTheme from "@/hooks/useTheme";

export default function Header() {
  useTheme();
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <section className="py-[1rem] md:pt-[3rem] md:pb-[1rem] px-[1rem] sm:px-[2rem] md:px-[4rem] flex justify-between items-center bg-bg-base dark:bg-d-bg-base">
      <h1 className="font-logo-primary text-[2rem] font-[900] text-text-secondary flex items-center dark:text-d-text-secondary">
        <span className="font-logo-primary text-[4rem] font-[900] text-accent-logo dark:text-d-accent-logo">
          X
        </span>
        BUGS
      </h1>

      <div className="flex justify-center items-center gap-[2rem] text-[2rem] text-text-secondary dark:text-d-text-secondary">
        <button
          className="cursor-pointer text-text-primary dark:text-d-text-primary"
          onClick={() => dispatch(toggleTheme())}
        >
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
