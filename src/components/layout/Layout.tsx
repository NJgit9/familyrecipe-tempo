import Sidebar from "./Sidebar";
import TopNav from "@/components/layout/TopNav";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex">
      {!isHomePage && <Sidebar />}
      <div className="flex-1 bg-white">
        <TopNav />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
