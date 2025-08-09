// page.tsx

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import DashBoard from "@/components/DashBoard";
import AddButton from "@/components/AddButton";

export default function Home() {
  return (
    <div className="relative bg-bg-base dark:bg-d-bg-base min-h-screen text-text-primary font-primary">
      <Header />
      <div className="md:px-[4rem] flex justify-center">
        <SideBar />
        <DashBoard />
      </div>
      <AddButton />
    </div>
  );
}
