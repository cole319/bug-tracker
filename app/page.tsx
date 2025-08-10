// page.tsx
"use client";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import DashBoard from "@/components/DashBoard";
import AddButton from "@/components/AddButton";
import BottomMenu from "@/components/BottomMenu";

export default function Home() {
  return (
    <div className="relative bg-bg-base dark:bg-d-bg-base min-h-screen text-text-primary font-primary w-full">
      <Header />
      <div className="relative px-[1rem] lg:px-[4rem] flex justify-between gap-[2rem]">
        <SideBar />
        <DashBoard />
        <AddButton />
      </div>
      <BottomMenu />
    </div>
  );
}
