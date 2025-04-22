import { ClockCircleFilled, EnvironmentFilled } from '@ant-design/icons';
import React from 'react';

export default function Ticket({
  date = { day: '22', month: '04', year: '2025' },
  status = 'Sắp diễn ra',
  orderCode = '333179908',
  time = '18:00 - 22:00, 22 tháng 04, 2025',
  location = 'Cung Thiếu Nhi Hà Nội, Mỹ Đình, Nam Từ Liêm, 2QGJ+27H, Quận Nam Từ Liêm, Thành Phố Hà Nội',
  onClick
}) {
  return (
    <div className="flex my-4 bg-gray-700 text-white rounded-md overflow-hidden shadow-lg cursor-pointer" onClick={onClick}>
      {/* Left date panel */}
      <div className="flex flex-col items-center justify-center bg-gray-800 px-4 py-6 relative">
        {/* Dot top */}
        <div className="absolute top-0 -right-1 w-2 h-2 bg-white rounded-full -mt-1" />
        <div className="text-4xl font-bold">{date.day}</div>
        <div className="text-sm">{`Tháng ${date.month}`}</div>
        <div className="text-sm">{date.year}</div>
        {/* Dot bottom */}
        <div className="absolute bottom-0 -right-1 w-2 h-2 bg-white rounded-full -mb-1" />
      </div>

      {/* Vertical separator */}
      <div className="w-0.5 bg-gray-600" />

      {/* Right content */}
      <div className="flex-1 p-6 space-y-3">
        <h3 className="text-lg font-bold">
          VIETNAM COLLEGIATE BASKETBALL CHAMPIONSHIP 2024
        </h3>

        {/* Labels */}
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-pink-400 rounded-full text-sm">{status}</span>
        </div>

        {/* Details */}
        <ul className="space-y-1 text-sm text-gray-200">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4h-1V2h-2v2H7V2H5v2H4c-1.1 0-2 .9-2 2v14a2 2 0 002 2h16a2 2 0 002-2V6c0-1.1-.9-2-2-2zM4 20V9h16v11H4z"/></svg>
            Order code: {orderCode}
          </li>
          <li className="flex items-center">
            <ClockCircleFilled className='mr-2'/>
            {time}
          </li>
          <li className="flex items-center">
            <EnvironmentFilled className='mr-2'/>
            {location}
          </li>
        </ul>
      </div>
    </div>
  );
}
