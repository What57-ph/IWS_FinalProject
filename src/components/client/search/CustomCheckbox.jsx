import { theme } from 'antd';
import { useState } from 'react';

const CustomCheckbox = ({ value, onChange, children }) => {
  const { token } = theme.useToken();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      onClick={() => {
        onChange(!value)
        setIsClicked(!isClicked)
      }}
      className={`
        cursor-pointer 
        px-6 
        py-1 
        rounded-full
        transition-all 
        duration-200 
        select-none
        border border-slate-500 hover:text-blue-500
        ${!value && isClicked ? 'bg-pink-500 text-white border border-pink-500 hover:text-white' : ''}
      `}
      style={{
        boxShadow: value ? `0 0 0 2px ${token.colorPrimary}20` : 'none'
      }}
    >
      {children}
    </div>
  );
};
export default CustomCheckbox