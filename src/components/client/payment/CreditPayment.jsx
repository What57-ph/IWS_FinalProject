import Logo from "../designLayouts/Logo";
import { FaBuildingColumns, FaCreditCard, FaRegCreditCard } from "react-icons/fa6";


const CreditPayment = () => {

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex flex-col text-gray-700 text-[21px] w-[60%] mx-auto">
        <header className=" flex flex-row items-center justify-between w-full" >
          <div className="flex justify-start items-center">
            <div className="scale-50 -translate-y-1/5">
              <Logo />
            </div>
            <h3 className="text-pink-500 text-[1.6vw]">CTICKET PLATFORM</h3>
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
        <div className=" w-full h-[2px] my-5 mx-2 flex flex-col gap-5">
          <button className="p-2 flex flex-1 w-full items-center justify-between transition-all ">
            <span className="pr-2">
              <FaBuildingColumns className="text-2x" />
            </span>

            <span className="pr-2 w-full flex items-center justify-between">
              <span class="font-semibold text-base text-xen-black-400 text-left">Banking transfer</span>
              <div className="flex space-x-1">
                <span className="w-12 h-8 bg-white border border-xen-gray-300 flex items-stretch justify-center rounded-sm px-1 py-0.5">
                  <img src="https://assets.xendit.co/payment-channels/logos/vietcapital-07a3e538-adc4-40ff-ab2c-84f4027fb9a2-logo.svg" alt="Viet Capital Bank" class="object-contain" />
                </span>

                <span className="w-12 h-8 bg-white border border-xen-gray-300 flex items-stretch justify-center rounded-sm px-1 py-0.5">
                  <img src="https://assets.xendit.co/payment-channels/logos/woori-79e688d8-efc5-433b-8f9f-709bcfb88f97-logo.svg" alt="Viet Capital Bank" class="object-contain" />
                </span>

                <span className="w-12 h-8 bg-white border border-xen-gray-300 flex items-stretch justify-center rounded-sm px-1 py-0.5">
                  <img src="https://assets.xendit.co/payment-channels/logos/vpb-98c9f38b-9663-435d-b254-e9782905a983-logo.svg" alt="Viet Capital Bank" class="object-contain" />
                </span>

                <span className="w-12 h-8 bg-white border border-xen-gray-300 flex items-stretch justify-center rounded-sm px-1 py-0.5">
                  <FaBuildingColumns className="text-2x text-blue-900" />
                </span>
              </div>
            </span>

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200 w-6 h-6"><polyline points="6 9 12 15 18 9"></polyline></svg>

          </button>

          <button className="p-2 flex flex-1 w-full items-center justify-between transition-all ">
            <span className="pr-2">
              <FaRegCreditCard className="text-2x" />
            </span>

            <span className="pr-2 w-full flex items-center justify-between">
              <span class="font-semibold text-base text-xen-black-400 text-left">Banking transfer</span>
              <div className="flex space-x-1">
                <span className="w-12 h-8 bg-white border border-xen-gray-300 flex items-stretch justify-center rounded-sm px-1 py-0.5">
                  <img src="public\img\card-brands\jcb.svg" alt="VISA" class="object-contain" />
                </span>

                <span className="w-12 h-8 bg-white border border-xen-gray-300 flex items-stretch justify-center rounded-sm px-1 py-0.5">
                  <img src="public\img\card-brands\mastercard.svg" alt="MASTERCARD" class="object-contain" />
                </span>

                <span className="w-12 h-8 bg-white border border-xen-gray-300 flex items-stretch justify-center rounded-sm px-1 py-0.5">
                  <img src="public\img\card-brands\visa.svg" alt="JCB" class="object-contain" />
                </span>

              </div>
            </span>

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200 w-6 h-6"><polyline points="6 9 12 15 18 9"></polyline></svg>

          </button>

        </div>
      </div>

      <div className="col-span-1 bg-green-500">

      </div>

    </div>
  )
}
export default CreditPayment