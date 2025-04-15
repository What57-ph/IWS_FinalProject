import { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa6";
import CardForm from "./CardForm";

const CardMethod = ({ createImg }) => {
  const [openButton2, setOpenButton2] = useState(true);
  const Cards = [
    "/img/card-brands/jcb.svg",
    "/img/card-brands/mastercard.svg",
    "/img/card-brands/visa.svg",
  ]

  return (
    <div className={`${openButton2 ? 'bg-gray-100/50' : 'bg-white'} px-2`}>
      <button className="p-2  flex flex-1 w-full items-center justify-between transition-all" onClick={() => setOpenButton2(!openButton2)}>
        <span className="pr-2">
          <FaRegCreditCard className="text-2x" />
        </span>

        <span className="pr-2 w-full flex items-center justify-between">
          <span class="font-semibold text-base text-xen-black-400 text-left">Banking transfer</span>
          <div className="flex space-x-1">
            {
              Cards.map(bank => (
                createImg(bank, "w-12", "h-8")
              ))
            }

          </div>
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`transition-transform duration-200 w-6 h-6 ${openButton2 ? 'rotate-180' : ''} `}><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>

      {
        openButton2 &&
        <>
          <CardForm />
        </>


      }

    </div>
  )
}
export default CardMethod