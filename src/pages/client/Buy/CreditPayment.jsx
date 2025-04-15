import Logo from "../../../components/client/designLayouts/Logo";
import BankMethod from "../../../components/client/payment/BankMethod";
import CardMethod from "../../../components/client/payment/CardMethod";


const CreditPayment = () => {

  const createImg = (src, width, height) => {
    return (
      <span className={`${width} ${height} bg-inherit  flex items-stretch justify-center rounded-sm px-1 py-0.5`}>
        <img src={src} alt="Viet Capital Bank" class="object-contain" />
      </span>
    )
  }

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

          <BankMethod createImg={createImg} />

          <CardMethod createImg={createImg} />

        </div>
      </div>

      <div className="col-span-1 bg-green-500">

      </div>

    </div>
  )
}
export default CreditPayment