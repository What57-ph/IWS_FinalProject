import { useAuth } from "../../../context/AuthContext";

export default function Sidebar({className}) {
    const { isAuthenticated } = useAuth();
    return(
        <div className={`flex flex-col lg:w-96 h-fit gap-8 p-8 bg-base-100 rounded-lg border border-b-2  ${className}`}>
          <div className="flex flex-col gap-4">
            <div
              className="px-3 py-1 rounded-full border-none font-medium"
            >
              <div>Đang mở bán</div>
            </div>
            <h2 className="text-2xl font-semibold">
              ATTACK ON TITAN DEVOTION - The Symphony of Freedom
            </h2>

            {/* Ngày diễn ra */}
            <div className="flex flex-row gap-3">
              <div className="w-6 h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 10H3m13-8v4M8 2v4m-.2 16h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 19.72 21 18.88 21 17.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 4 17.88 4 16.2 4H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 6.28 3 7.12 3 8.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 22 6.12 22 7.8 22"
                  />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold">
                  25 tháng 4, 2025 - 26 tháng 4, 2025
                </div>
                <div className="text-sm text-gray-500"></div>
              </div>
            </div>

            {/* Địa điểm */}
            <div className="flex flex-row gap-3">
              <div className="w-6 h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 22c4-4 8-7.582 8-12a8 8 0 1 0-16 0c0 4.418 4 8 8 12"
                  />
                </svg>
              </div>
              <a
                href="https://maps.app.goo.gl/gzEnUCEv2YacmcyQ6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="font-semibold">
                  Nhà Hát Quân Đội - 140 Cộng Hòa, Phường 4, Quận Tân Bình, TP
                  Hồ Chí Minh
                </div>
                <div className="text-gray-500 text-sm">
                  Military Theater - 140 Cong Hoa Street, Ward 4, Tan Binh
                  District, Ho Chi Minh City, Vietnam
                </div>
              </a>
            </div>

            {/* Giá vé */}
            <div className="flex flex-row gap-3">
              <div className="w-6 h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 16a4 4 0 0 0 4 4h4a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h4a4 4 0 0 1 4 4m-6-6v20"
                  />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold">Giá vé</div>
                <div className="text-sm text-gray-500">
                  Từ 1.390.000 VND đến 2.190.000 VND
                </div>
              </div>
            </div>
          </div>

          {/* Nút mua vé */}
          <div className="flex flex-col max-lg:hidden">
            {isAuthenticated
              ? <a href="" className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
                  Mua vé ngay
                </a>
              :<a href="/auth/login" className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
              Đăng nhập để mua vé
            </a>
            }
            
          </div>

          {/* Chia sẻ */}
          <div className="flex flex-row space-x-2 items-center">
            <span className="max-lg:hidden text-base text-gray-500">
              Chia sẻ
            </span>

            <button
              className="react-share__ShareButton btn btn-sm w-10 h-10 grayscale hover:grayscale-0"
              title="title title title"
              style={{
                border: "none",
                padding: 0,
                font: "inherit",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {/* Facebook Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                className="w-6 h-6"
              >
                <g clipPath="url(#fb-icon_svg__a)">
                  <path
                    fill="#1877F2"
                    d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12"
                  />
                  <path
                    fill="#fff"
                    d="M16.671 15.469 17.203 12h-3.328V9.75c0-.949.465-1.875 1.956-1.875h1.513V4.922s-1.374-.234-2.686-.234c-2.741 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v8.385a12.1 12.1 0 0 0 3.75 0V15.47z"
                  />
                </g>
                <defs>
                  <clipPath id="fb-icon_svg__a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button
              type="button"
              className="btn px-2 w-10 h-10 grayscale hover:grayscale-0 btn-sm"
            >
              {/* Link icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                />
              </svg>
            </button>
          </div>
        </div>
    )
}