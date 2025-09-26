import Navbar from "@/pages/home/navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="container mx-auto px-4 ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
