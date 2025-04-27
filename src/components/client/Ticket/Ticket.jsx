import { ClockCircleFilled, EnvironmentFilled } from '@ant-design/icons';
import React from 'react';
import formatDateTime from '../../../utils/formatDateTime';

export default function Ticket({
  data,
  location = 'Cung Thiếu Nhi Hà Nội, Mỹ Đình, Nam Từ Liêm, 2QGJ+27H, Quận Nam Từ Liêm, Thành Phố Hà Nội',
  onClick
}) {
  const eventInfo = data.event;
  const now = new Date()
  const endDate = new Date(eventInfo.endDate)
  const date = new Date(eventInfo.startDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();
  console.log('data', data);
  
  return (
    <div 
      className="flex my-4 bg-gray-700 text-white rounded-md overflow-hidden shadow-lg cursor-pointer" 
      onClick={onClick}
      title='Xem chi tiết'
    >
      {/* Left date panel */}
      <div className="flex flex-col items-center justify-center bg-gray-800 px-4 py-6 relative w-28">
        {/* Dot top */}
        <div className="absolute top-0 -right-1 w-2 h-2 bg-white rounded-full -mt-1" />
        <div className="text-4xl font-bold">{day}</div>
        <div className="text-sm">{`${month}/${year}`}</div>
        {/* Dot bottom */}
        <div className="absolute bottom-0 -right-1 w-2 h-2 bg-white rounded-full -mb-1" />
      </div>

      {/* Vertical separator */}
      <div className="w-0.5 bg-gray-600" />

      {/* Right content */}
      <div className="flex-1 p-6 space-y-3">
        <h3 className="text-lg font-bold">
          {eventInfo.name}
        </h3>

        {/* Labels */}
        <div className="flex space-x-2">
          {eventInfo.status == 'OPEN' && endDate > now
            ? <span className="px-3 py-1 bg-pink-400 rounded-full text-sm">Upcoming</span>
            : <span className="px-3 py-1 bg-gray-400 rounded-full text-sm">Closed</span>
          } 
          {eventInfo.status != 'OPEN'
            ? <span className="px-3 py-1 bg-gray-400 rounded-full text-sm">{eventInfo.status}</span>
            : ''
          } 
        </div>

        {/* Details */}
        <ul className="space-y-1 text-sm text-gray-200">
          
          <li className="flex items-center">
            <ClockCircleFilled className='mr-2'/>
            {formatDateTime(eventInfo.startDate)} - {formatDateTime(eventInfo.endDate)}
          </li>
          <li className="flex items-center">
            <EnvironmentFilled className='mr-2'/>
            {eventInfo.houseNumber}, {eventInfo.ward}, {eventInfo.province }, {eventInfo.district}
          </li>
        </ul>
      </div>
    </div>
  );
}
