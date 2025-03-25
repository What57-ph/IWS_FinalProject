import { Outlet } from "react-router-dom";
import Header from "./designLayouts/Header";
import Footer from "./designLayouts/Footer";

const ClientLayout = () => {
  return (
    <>
      <div className="m-auto min-h-screen px-10">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default ClientLayout;
