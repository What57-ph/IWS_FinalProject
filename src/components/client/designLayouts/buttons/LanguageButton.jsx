import React from "react";

const LanguageButton = ({ language }) => {
  return (
    <>
      {language === "EN" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
        >
          <g clipPath="url(#gb-circle-icon_svg__a)">
            <path
              fill="#F0F0F0"
              d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10"
            ></path>
            <path
              fill="#0052B4"
              d="M2.067 3.91A10 10 0 0 0 .344 7.39h5.203zM19.656 7.39a10 10 0 0 0-1.723-3.479l-3.48 3.48zM.344 12.609a10 10 0 0 0 1.723 3.479l3.48-3.48zM16.088 2.066a10 10 0 0 0-3.48-1.722v5.202zM3.912 17.931a10 10 0 0 0 3.48 1.723v-5.202zM7.391.344a10 10 0 0 0-3.48 1.722l3.48 3.48zM12.608 19.654a10 10 0 0 0 3.48-1.723l-3.48-3.48zM14.454 12.609l3.48 3.479a10 10 0 0 0 1.722-3.48z"
            ></path>
            <path
              fill="#D80027"
              d="M19.915 8.696h-8.61V.085a10 10 0 0 0-2.61 0v8.61H.086a10 10 0 0 0 0 2.61h8.61v8.61a10 10 0 0 0 2.61 0v-8.61h8.61a10 10 0 0 0 0-2.61"
            ></path>
            <path
              fill="#D80027"
              d="m12.609 12.61 4.462 4.462q.308-.308.588-.642l-3.82-3.82zM7.391 12.61 2.93 17.071q.308.307.642.588l3.82-3.821zM7.391 7.39 2.93 2.929q-.308.309-.588.642l3.82 3.82zM12.609 7.392l4.462-4.463a10 10 0 0 0-.642-.587l-3.82 3.82z"
            ></path>
          </g>
          <defs>
            <clipPath id="gb-circle-icon_svg__a">
              <path fill="#fff" d="M0 0h20v20H0z"></path>
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
        >
          <g clip-path="url(#vn-circle-icon_svg__a)">
            <path
              fill="#D80027"
              d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10"
            ></path>
            <path
              fill="#FFDA44"
              d="m10 5.218 1.08 3.321h3.492l-2.826 2.053 1.08 3.321L10 11.861l-2.825 2.052 1.08-3.321-2.826-2.053H8.92z"
            ></path>
          </g>
          <defs>
            <clipPath id="vn-circle-icon_svg__a">
              <path fill="#fff" d="M0 0h20v20H0z"></path>
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
};

export default LanguageButton;
