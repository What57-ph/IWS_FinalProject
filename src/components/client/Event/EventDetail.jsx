import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DetailMap from "./DetailMap";
import DetailOrganizer from "./DetailOrganizer.";
import SuggestEvent from "./SuggestEvents";

export default function EventDetail() {
  return (
    <div
      id="event-page-container"
      className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto pt-5"
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
    </div>
  );
}
