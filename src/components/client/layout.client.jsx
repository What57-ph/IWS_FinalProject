import { Outlet } from "react-router-dom";
import Header from "./designLayouts/Header";
import Footer from "./designLayouts/Footer";

const ClientLayout = () => {
  return (
    <>
      <div className="m-auto min-h-screen ">
        <Header />
        <div className="border-1 border-b-slate-200"></div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default ClientLayout;
