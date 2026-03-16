import { Outlet} from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
export default function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
