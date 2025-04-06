import { useState } from "react";

export default function DetailMap() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <h1 id="map" className="font-bold text-2xl mb-4">
        Lịch sự kiện và sơ đồ chỗ ngồi
      </h1>
      <div className="bg-base-100 rounded-lg border border-b-2 space-y-4">
        <div className="flex max-sm:flex-col-reverse gap-3 py-4 px-8 space-y-1 border-b ">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/cticket-prod.appspot.com/o/event_images%2Fmap%2F0504_seatmap_668x680.svg?alt=media&token=37e57d96-6f51-4478-bae9-a38bb4d77229"
            className="sm:w-24 border rounded-xl cursor-pointer "
            alt="Sơ đồ chỗ ngồi"
            onClick={openModal}
          />

          <div>
            <a href="https://maps.app.goo.gl/72ZuBd3GpZQKn6918" target="_blank">
              <div className="font-semibold">
                Nhà Thi Đấu Quân Khu 7, 202 Hoàng Văn Thụ, Phường 9, Quận Phú
                Nhuận, TP.HCM
              </div>
              <div className="text-gray-500 text-sm">
                Military Zone 7 Indoor Sports Complex, 202 Hoang Van Thu, Ward
                9, Phu Nhuan, HCMC
              </div>
            </a>

            <button
              onClick={openModal}
              className="text-info text-sm font-semibold cursor-pointer mt-2"
            >
              Xem sơ đồ
            </button>

            {isOpen && (
              <div
                className="fixed z-[101] inset-0 py-10 bg-black bg-opacity-50 flex justify-center"
                onClick={closeModal}
              >
                {/* Modal box */}
                <div
                  className="flex flex-col bg-white rounded-lg p-4 max-w-xl w-full shadow-lg relative "
                  onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click "lọt" ra ngoài
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">Sơ đồ chỗ ngồi</span>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-black text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-scroll">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/cticket-prod.appspot.com/o/event_images%2Fmap%2F0504_seatmap_668x680.svg?alt=media&token=37e57d96-6f51-4478-bae9-a38bb4d77229"
                      alt="Sơ đồ"
                      className="w-full rounded "
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
