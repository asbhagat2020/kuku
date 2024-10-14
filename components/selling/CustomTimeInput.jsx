import React, { useState } from 'react';
import { AlarmClock, Clock } from 'lucide-react';

const CustomTimeInput = ({ value, onChange, name, error }) => {
  const [focused, setFocused] = useState(false);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <div className="relative w-full sm:w-1/2 mt-4 sm:mt-0">
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full h-[50px] border-2 rounded-lg px-5 pr-10 appearance-none focus:outline-none font-karla text-gray-500"
        >
          <option className='font-karla text-gray-500' value="" disabled hidden>
            Select pickup time
          </option>
          {generateTimeOptions()}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <AlarmClock className="h-5 w-5 text-pink-600" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTimeInput;