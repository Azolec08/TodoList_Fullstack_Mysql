import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
