import { Outlet } from "react-router-dom";
import Header from "./designLayouts/Header";
import Footer from "./designLayouts/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ClientLayout = () => {
  return (
    <>
      <div className="m-auto">
        <Header />
        <div className="border-1 border-b-slate-200"></div>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};
export default ClientLayout;
