// components/DashBoard.tsx

"use client";
import { useState, useEffect } from "react";

import React from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";

import { useAppDispatch, useAppSelector } from "@/stores/storeHooks";
import { subscribeToIssues } from "@/firebase/issues";
import { setIssues, setLoading } from "@/features/issues/issuesSlice";
import { RootState } from "@/stores/store";
import IssueCard from "@/components/IssueCard";

const menuItems = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Open",
  },
  {
    id: 3,
    name: "In Progress",
  },
];

export default function DashBoard() {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s: RootState) => s.issues);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsub = subscribeToIssues((issues) => {
      dispatch(setIssues(issues));
    });
    return () => unsub();
  }, [dispatch]);
  return (
    <section className="w-full relative pb-[4rem] md:pl-[22rem] pt-[2rem]">
      <div className="flex justify-start lg:flex-row flex-col items-end">
        <nav className="hidden lg:flex justify-start items-center xl:gap-[3rem] lg:gap-[1rem] fixed bg-bg-base dark:bg-d-bg-base z-50 border-b-[0.2px] border-accent-primary/20 pb-[0.5rem]">
          {menuItems.map((menuItem) => (
            <button
              key={menuItem.id}
              className="cursor-pointer hover:bg-accent-primary px-[1rem] py-[0.5rem] rounded-lg hover:text-d-text-primary ease-in-out duration-300 active:bg-accent-primary dark:text-d-text-secondary dark:hover:text-accent-primary dark:hover:bg-d-text-primary"
            >
              {menuItem.name}
            </button>
          ))}

          <div className="flex justify-center items-center gap-[0.5rem] border-[0.2px] py-[0.5rem] px-[1rem] rounded-full text-md border-accent-primary/50 ">
            <input
              type="text"
              placeholder="Search issues..."
              className="outline-none dark:placeholder:text-d-accent-primary/50"
            />
            <p className="text-[1.4rem] dark:text-d-accent-primary/70 ">
              <CiSearch />
            </p>
          </div>
        </nav>
        <div className="lg:hidden flex justify-between items-center gap-[1rem] w-full">
          <div className="flex justify-center items-center gap-[0.5rem] border-[0.2px] py-[0.5rem] px-[1rem] rounded-full text-md border-d-accent-primary/50 w-full">
            <input
              type="text"
              placeholder="Search issues..."
              className="outline-none dark:placeholder:text-d-accent-primary/50 w-full"
            />
            <p className="text-[1.4rem] dark:text-d-accent-primary/70 ">
              <CiSearch />
            </p>
          </div>
          {!menuOpen && (
            <button
              className="text-[2rem] z-50"
              onClick={() => setMenuOpen(true)}
            >
              <RxHamburgerMenu />
            </button>
          )}
          {menuOpen && (
            <button
              className="text-[2rem] z-50"
              onClick={() => setMenuOpen(false)}
            >
              <IoCloseOutline />
            </button>
          )}
        </div>

        {menuOpen && (
          <nav className="absolute opacity-[90%] lg:hidden flex flex-col gap-[1rem] w-[50%] py-[2rem] bg-bg-base border-accent-primary/20 dark:bg-d-card-bg border-[0.8px]">
            {menuItems.map((menuItem) => (
              <button
                key={menuItem.id}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer hover:bg-accent-primary px-[1rem] py-[0.5rem] rounded-lg hover:text-d-text-primary ease-in-out duration-300 active:bg-accent-primary dark:text-d-text-secondary dark:hover:text-accent-primary dark:hover:bg-d-text-primary"
              >
                {menuItem.name}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className="pt-[0.5rem] flex flex-col gap-[1rem]">
        {loading && (
          <div className="flex justify-start items-center gap-[1rem] text-d-accent-primary dark:text-d-accent-primary/40">
            Loading issues...{" "}
            <span className="animate-spin">
              <ImSpinner9 />
            </span>
          </div>
        )}
        <div className="grid gap-4">
          {items.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </section>
  );
}
