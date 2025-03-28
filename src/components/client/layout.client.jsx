import { Outlet } from "react-router-dom";
import Header from "./designLayouts/Header";
import Footer from "./designLayouts/Footer";

const ClientLayout = () => {
  return (
    <>
      <div className="m-auto min-h-screen xl:px-32 px-2">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default ClientLayout;
