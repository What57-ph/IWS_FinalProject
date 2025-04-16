import { useState } from "react";
import { FaBuildingColumns } from "react-icons/fa6";

const BankMethod = ({ createImg }) => {
  const [openButton1, setOpenButton1] = useState(false);

  const Banks = [
    "https://assets.xendit.co/payment-channels/logos/vietcapital-07a3e538-adc4-40ff-ab2c-84f4027fb9a2-logo.svg",
    "https://assets.xendit.co/payment-channels/logos/woori-79e688d8-efc5-433b-8f9f-709bcfb88f97-logo.svg",
    "https://assets.xendit.co/payment-channels/logos/vpb-98c9f38b-9663-435d-b254-e9782905a983-logo.svg"
  ]

  return (
    <div className={`${openButton1 ? 'bg-gray-100/50' : 'bg-white border border-slate-200 border-b-0'} px-2`}>
      <button className={`p-2  flex flex-1 w-full items-center justify-between transition-all `} onClick={() => setOpenButton1(!openButton1)}>
        <span className="pr-2">
          <FaBuildingColumns className="text-2x" />
        </span>

        <span className="pr-2 w-full flex items-center justify-between">
          <span class="font-semibold text-base text-xen-black-400 text-left">Banking transfer</span>
          {
            !openButton1 &&
            <div className="flex space-x-1 ">
              {
                Banks.map(bank => (
                  createImg(bank, "w-12", "h-8")
                ))
              }
              <span className="w-12 h-8 bg-white flex items-stretch justify-center rounded-sm px-1 py-0.5">
                <FaBuildingColumns className="text-2x text-blue-900" />
              </span>
            </div>
          }

        </span>

        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`transition-transform duration-200 w-6 h-6 ${openButton1 ? 'rotate-180' : ''} `}><polyline points="6 9 12 15 18 9"></polyline></svg>

      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openButton1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="grid grid-cols-3 m-11 gap-y-5 gap-x-3 transform transition-all duration-500 origin-top animate-slideDown">
          {
            Banks.map(bank => (
              <div className="h-[100px] w-full bg-white py-5 border border-slate-200 hover:border hover:border-pink-500 cursor-pointer transform transition-all duration-200">
                {createImg(bank, "w-13", "h-10 ")}
              </div>
            ))
          }

          <div className="h-full w-full border border-slate-200 hover:border hover:border-pink-500 cursor-pointer transform transition-all duration-200">
            <div className="flex flex-col items-center justify-center h-[100px] w-full bg-white">
              <span className="w-13 h-10 flex justify-center rounded-sm px-1 py-0.5">
                <FaBuildingColumns className="text-2x text-pink-500" />
              </span>
              <p className="text-[18px]">Other banks</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default BankMethod