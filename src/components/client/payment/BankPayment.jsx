import { FaRegCopy } from "react-icons/fa6"

const BankPayment = ({ openBank, setOpenBank, src }) => {
  return (
    <>
      {
        openBank &&
        <div className="my-0 sm:my-10 flex flex-col items-center">
          <div className="w-[90%] border border-slate-400 p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0">
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col">
                <label className="text-[18px]">Account number </label>
                <span className="text-[25px] flex flex-row items-center gap-3">99900031286912 <FaRegCopy className="cursor-pointer hover:text-pink-500" /></span>
              </div>

              <div className="flex flex-col">
                <label className="text-[18px]">Account name</label>
                <span className="text-[25px]">CTICKET PLATFORM</span>
              </div>

              <div className="flex flex-col">
                <label className="text-[18px]">Amount to be paid</label>
                <span className="text-[25px]">VND 2,500,000</span>
              </div>
            </div>

            <span className={`h-full w-15 bg-inherit flex items-center justify-center rounded-sm px-1 py-0.5 scale-100 sm:scale-100`}>
              <img src={src} alt="Viet Capital Bank" class="object-contain" />
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-reverse p-6 sm:p-8 border w-[90%] border-gray-400 rounded-sm mt-6 justify-between">
            <div className="self-center p-0">
              <img src="/img/card-brands/viet-qr.svg" alt="Viet QR" class="w-32 sm:w-52 md:w-80" />
            </div>
            <div className="self-center p-0">
              <img src="/img/card-brands/qr.jpg" alt="Viet QR" class="w-32 sm:w-52 md:w-64 " />
            </div>
          </div>

          <div className="w-[90%]">
            <div className="flex flex-col self-start">
              <h3 className="inline-block px-4 md:px-6 py-4 border-b-2 border-pink-500 text-pink-500 font-bold w-32">
                ibanking
              </h3>
            </div>

            <div className="my-3 flex flex-col gap-5 text-[18px]">
              <div>
                <h3 className="text-[20px] mb-2 font-bold">Đăng Nhập Vào Tài Khoản</h3>
                <ol className="list-decimal ml-4 pl-5 space-y-3">
                  <li>Truy cập vào trang web ngân hàng của bạn</li>
                  <li>Đăng nhập với tài khoản và mật khẩu của bạn</li>
                </ol>
              </div>

              <div>
                <h3 className="text-[20px] mb-2 font-bold">Chi Tiết Thanh Toán</h3>
                <ol className="list-decimal ml-4 pl-5 space-y-3"><li>Chọn CHUYỂN KHOẢN</li><li>Chọn CHUYỂN KHOẢN 24/7 (NAPAS)</li><li>Chọn TÀI KHOẢN NGƯỜI NHẬN</li><li>Nhập số tài khoản <span class="font-bold text-primary">99900031286960</span></li><li>Nhập số tiền cần chuyển</li><li>Xác nhận thông tin giao dịch và nhấn "XÁC NHẬN"</li><li>Nhập mã PIN hoặc mã Token để hoàn tất giao dịch</li></ol>
              </div>

              <div>
                <h3 className="text-[20px] mb-2 font-bold">Giao Dịch Thành Công</h3>
                <ol className="list-decimal ml-4 pl-5 space-y-3"><li>Giao dịch của bạn đã được thực hiện thành công</li><li>Sau khi hoàn tất giao dịch, hóa đơn sẽ được cập nhật tự động. Quá trình này có thể mất tối đa 5 phút</li></ol>
              </div>
            </div>

            <button className="bg-pink-500 hover:bg-pink-600 py-2 px-7 my-4 w-full sm:w-48 text-white rounded-md" onClick={() => setOpenBank(!openBank)}>
              Go back
            </button>
          </div>
        </div>}
    </>
  )
}
export default BankPayment