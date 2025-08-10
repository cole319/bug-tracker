import Header from "@/components/Header";
import RegisterModal from "@/components/RegisterModal";

export default function LoginPage() {
  return (
    <div className="h-screen bg-bg-base dark:bg-d-bg-base flex flex-col items-center font-primary">
      <Header />
      <RegisterModal />
    </div>
  );
}
