import { Footer } from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="container mx-auto px-4 ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
