import { FaCakeCandles, FaClock, FaRegClock, FaRegCreditCard } from "react-icons/fa6";
import Logo from "../../../components/client/designLayouts/Logo";
import BankMethod from "../../../components/client/payment/BankMethod";
import CardMethod from "../../../components/client/payment/CardMethod";
import Order from "../../../components/client/payment/Order";
import { useState } from "react";


const CreditPayment = () => {

  const createImg = (src, width, height) => {
    return (
      <span className={`${width} ${height} bg-inherit  flex items-stretch justify-center rounded-sm px-1 py-0.5`}>
        <img src={src} alt="Viet Capital Bank" class="object-contain" />
      </span>
    )
  }

  function generateRandomCode(length = 30) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  const [openButton3, setOpenButton3] = useState(false);

  return (

    <>
      <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-pink-500 shadow-sm">
        <div className="flex items-center -translate-x-5">
          <div className="scale-50 -translate-y-1/5  bg-white p-2 rounded-md">
            <Logo />
          </div>
          <h3 className="text-white text-[4vw]">CTICKET PLATFORM</h3>
        </div>
        <select className="text-sm p-1 border rounded">
          <option>English</option>
          <option>Vietnamese</option>
        </select>
      </header>


      <div className=" flex flex-col lg:grid lg:grid-cols-3 min-h-screen top-0">


        <div className="col-span-1 p-5 flex flex-col gap-5  bg-slate-100/50 text-[15px]  lg:hidden">
          <button className=" flex flex-1 w-full items-center justify-between transition-all text-[20px] translate-y-3" onClick={() => setOpenButton3(!openButton3)}>
            <span className="pr-2">
              <FaRegCreditCard />
            </span>

            <span className="pr-2 w-full flex items-center justify-between">
              <span class="font-semibold text-xen-black-400 text-left">Banking transfer</span>
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`transition-transform duration-200 w-6 h-6 ${openButton3 ? 'rotate-180' : ''} `}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <Order openButton3={openButton3} />
        </div>


        <div className="col-span-2 flex flex-col text-gray-700 text-[21px] w-[90%] lg:w-[65%] mx-auto pt-8 ">
          <header className="hidden lg:flex flex-row items-center justify-between w-full " >
            <div className="flex justify-start items-center">
              <div className="scale-50 -translate-y-1/5">
                <Logo />
              </div>
              <h3 className="text-pink-500 text-[30px]">CTICKET PLATFORM</h3>
            </div>
            <select name="cars" id="cars" className="ml-4 cursor-pointer" >
              <option value="english">English</option>
              <option value="Vietnam">Vietnamese</option>
            </select>
          </header>

          <div className="flex flex-col items-center my-10">
            <h3 className="">Payment before 21:42 13th 4, 2025 </h3>
            <h2 className="text-pink-500 text-[2.5rem]">VND 5,500,000</h2>
          </div>

          <div>Payment method</div>
          <div className=" w-full h-[2px] my-5 mx-2 flex flex-col ">

            <BankMethod createImg={createImg} />

            <CardMethod createImg={createImg} />

          </div>
        </div>

        <div className="col-span-1 pt-8 px-10 text-[18px] hidden lg:block bg-slate-100/50">
          <h2>Review order</h2>
          <p>Order #: {generateRandomCode()}</p>

          <span className="flex flex-row items-center gap-4 my-7">
            <FaRegClock className="text-pink-500" />
            Payment before 21:42 13th 4, 2025
          </span>

          <Order />
        </div>

      </div>
    </>
  )
}
export default CreditPayment