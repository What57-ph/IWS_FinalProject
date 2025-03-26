import React from "react";
import Logo from "./Logo";
import FooterImage from "./FooterImage";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-neutral-content flex flex-col mt-10 text-white">
      <section className="mt-12 mb-6 md:mt-16 md:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-4">
            <Logo />
          </div>

          <div>
            <p className="text-gray-400 font-bold mb-5">ABOUT US</p>
            <ul className="space-y-2">
              {[
                "About us",
                "Operational Regulations",
                "Information Privacy Policy",
                "Payment Method",
                "Our Partners",
                "Terms of use",
              ].map((item, index) => (
                <li key={index}>
                  <Link to="/about-us">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-gray-400 font-bold mb-5">OFFERS</p>
            <ul className="space-y-2">
              {["For customer", "Promotion"].map((item, index) => (
                <li key={index}>
                  <Link to="/about-us">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-gray-400 font-bold mb-5">SUPPORT</p>
            <ul className="space-y-2">
              {["Contact Us", "FAQ", "Blog", "Instructions"].map(
                (item, index) => (
                  <li key={index}>
                    <Link to="/about-us">{item}</Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      <div className="md:mx-36 mx-4 max-w-7xl my-10">
        <div className="flex justify-between md:flex-row flex-col gap-y-7">
          <div>
            <p className="text-xl font-[700]">BEFINANCIAL LIMITED COMPANY</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>Legal representative: Nguyễn Hữu Quang</li>
              <li>
                Address: 16th Floor, Sai Gon Tower Building, 29 Le Duan, Ben
                Nghe Ward, District 1, Ho Chi Minh City, Vietnam
              </li>
              <li>
                Business registration number: 0315728586 issued on June 10,
                2019, at the Business Registration Office - Department of
                Planning and Investment of Ho Chi Minh City.
              </li>
              <li>Hotline: 1900 636 686 | Email: chat@cticket.vn</li>
            </ul>
          </div>
          <div className="flex justify-start md:justify-end">
            <FooterImage />
          </div>
        </div>
      </div>

      <section className="py-6 border-t border-[#1D2939]">
        <div className="flex flex-col md:flex-row px-4 md:px-8 mx-auto max-w-7xl space-y-4 md:space-y-0 md:justify-between">
          <div className="text-center md:text-left">
            All rights reserved 2024 © CTicket
          </div>
          <div className="flex justify-center md:justify-end space-x-6">
            <a
              href="https://www.facebook.com/cticket.vn"
              target="_blank"
              className="w-6 h-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <g clipPath="url(#footer-social-facebook_svg__a)">
                  <path
                    fill="#98A2B3"
                    d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12"
                  ></path>
                </g>
                <defs>
                  <clipPath id="footer-social-facebook_svg__a">
                    <path fill="#fff" d="M0 0h24v24H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
