"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { IoIosLogOut, IoMdMoon, IoMdSunny } from "react-icons/io";
import { toggleTheme } from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/stores/storeHooks";
import { logout } from "@/firebase/auth";
import useTheme from "@/hooks/useTheme";

export default function Header() {
  useTheme();
  const theme = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="fixed z-50 w-full py-[1rem] md:pt-[1.5rem] md:pb-[4rem] px-[1rem] md:px-[2rem] lg:px-[4rem] flex justify-between items-center bg-bg-base dark:bg-d-bg-base">
      <h1 className="font-logo-primary text-[2rem] font-[900] text-text-secondary flex items-center dark:text-d-text-secondary">
        <span className="font-logo-primary text-[4rem] font-[900] text-accent-logo dark:text-d-accent-logo">
          X
        </span>
        BUGS
      </h1>

      <div className="flex justify-center items-center gap-[2rem] text-[2rem] text-text-secondary dark:text-d-text-secondary">
        <button
          className="cursor-pointer text-text-primary dark:text-d-text-primary text-[1.5rem] border-[0.5px] dark:border-d-text-primary/50 rounded-full p-[0.3rem]"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
        </button>

        {user && (
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <Image
                src="/user.png"
                height={40}
                width={40}
                alt="user icon"
                className="rounded-full cursor-pointer"
              />
            </button>

            {profileMenuOpen && (
              <div className="fixed bg-card-bg dark:bg-d-card-bg border-[0.2px] border-accent-primary/20 dark:border-d-accent-primary/20 p-[1rem] right-[1rem] z-[120] rounded-md">
                <button
                  className="bg-accent-primary dark:bg-d-text-primary text-d-text-primary dark:text-text-primary font-medium text-[1rem] flex gap-[1rem] justify-center items-center px-[1rem] py-[0.5rem] cursor-pointer rounded-md"
                  onClick={handleLogout}
                >
                  Logout <IoIosLogOut />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
