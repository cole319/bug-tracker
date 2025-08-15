// app/page.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import SideBar from "@/components/SideBar";
import DashBoard from "@/components/DashBoard";
import AddFloatingButton from "@/components/AddFloatingButton";
import AddIssueModal from "@/components/AddIssueModal";
import BottomMenu from "@/components/BottomMenu";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login"); // Adjust to your actual login route
    }
  }, [user, router]);

  // Optional: show nothing until we know if user is logged in
  if (!user) return null;

  return (
    <div className="relative bg-bg-base dark:bg-d-bg-base min-h-screen text-text-primary font-primary w-full pt-[8rem]">
      <div className="relative px-[1rem] lg:px-[4rem] flex justify-between gap-[2rem] md:py-[1rem]">
        <DashBoard />
        <SideBar onOpenModal={handleOpenModal} />
        <AddFloatingButton onOpenModal={handleOpenModal} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AddIssueModal onClose={handleCloseModal} />
        </div>
      )}
      <BottomMenu />
    </div>
  );
}
