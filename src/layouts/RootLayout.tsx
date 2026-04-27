import { Outlet } from "react-router";
import { TopHeader } from "../components/navigation/topHeader";

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <main className="w-full pt-12 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};
