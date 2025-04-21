const Order = ({ openButton3 }) => {
  return (
    <div
      className={`grid grid-cols-2 gap-7 mb-5 overflow-hidden 
      transition-all duration-500 ease-in-out 
      ${openButton3 ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} 
      lg:max-h-none lg:opacity-100 lg:transition-none`}
    >      <div className="flex flex-col ">
        <span className="text-sm lg:text-base">V1</span>
        <span className="text-sm lg:text-base">1 x VND 5,500,000</span>
      </div>

      <span className="justify-self-end text-sm lg:text-base">VND 5,500,000</span>

      <div className="col-span-2 flex justify-between items-center mt-2 lg:justify-end">
        <span className="text-sm lg:text-base lg:mr-5">Subtotal</span>
        <span className="text-sm lg:text-base">VND 5,500,000</span>
      </div>

      <span className="text-lg font-medium lg:text-base lg:font-normal">Total amount</span>
      <span className="justify-self-end font-bold text-lg lg:text-[20px]">VND 5,500,000</span>
    </div>
  )
}
export default Order