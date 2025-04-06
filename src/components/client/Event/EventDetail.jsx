import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DetailMap from "./DetailMap";
import DetailOrganizer from "./DetailOrganizer.";
import SuggestEvent from "./SuggestEvents";
import { useAuth } from "../../../context/AuthContext";

export default function EventDetail() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div
      id="event-page-container"
      className="relative max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto pt-5"
    >
      <div id="detail-container" className="flex gap-4">
        <div className="flex-1 ">
          <img
            src="img/information/1.png"
            alt="event-image"
            className="mb-20"
          />
          <Sidebar className="lg:hidden" />
          <Navbar />
          <DetailMap />
          <div className="mt-20">
            <h1 id="about" className="font-bold text-2xl mb-4">
              Về sự kiện
            </h1>
            <div className="p-8 border rounded-lg">
              <img src="img/information/1.png" alt="event-image" />
            </div>
          </div>
          <DetailOrganizer />
        </div>
        <Sidebar className="max-lg:hidden sticky top-4" />
      </div>
      <SuggestEvent />
      <div class="sticky bottom-0 bg-base-100 text-center p-4 z-20 lg:hidden bg-white">
            {isAuthenticated
              ? <a href="" className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
                  Mua vé ngay
                </a>
              :<a href="/auth/login" className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
              Đăng nhập để mua vé
            </a>
            }
      </div>
    </div>
  );
}
