import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";

function RootLayout() {
  const navigaton = useNavigation();
  const isLoading = navigaton.state === "loading";
  return (
    <div className="h-screen w-screen grid grid-rows-[auto_1fr]">
      <Navbar />
      {isLoading && <div className="text-center">Loading...</div>}
      <main className="p-2 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
