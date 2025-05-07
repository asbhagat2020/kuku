import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const DraggableProgressBar = ({ min = 5, max = 35, step = 1, setSelectedScale, customNumber }) => {
  const [value, setValue] = useState(min);  
  const barRef = useRef(null);
  const [displayMax, setDisplayMax] = useState(max);

   
  useEffect(() => {
    if (customNumber !== "" && !isNaN(customNumber)) {
      const numValue = Number(customNumber);
      setValue(numValue);
      

      if (numValue > displayMax) {
        setDisplayMax(Math.ceil(numValue / 5) * 5); 
      }
    }
  }, [customNumber, displayMax]);

  const handleMouseDown = (e) => {
    const updateValue = (clientX) => {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const newValue = Math.round((percentage * (displayMax - min) + min) / step) * step;
        const clampedValue = Math.max(min, Math.min(displayMax, newValue));
        setValue(clampedValue);
        setSelectedScale(clampedValue);
      }
    };

    updateValue(e.clientX);

    const handleMouseMove = (e) => updateValue(e.clientX);
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Generate tick marks dynamically
  const generateTicks = () => {
    const ticks = [];
    const step = 5;
    for (let i = min; i <= displayMax; i += step) {
      ticks.push(i);
    }
    return ticks;
  };

  const ticks = generateTicks();

  return (
    <div className="w-full mx-auto mt-4">
      {/* Display selected items centered above the circle */}
      <div className="text-center text-xl font-bold font-karla mb-2">
        {value} items
      </div>
      
      {/* Progress bar container */}
      <div className="relative">
        <div
          ref={barRef}
          className="h-2 bg-gray-200 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Colored portion of the bar */}
          <div
            className="absolute h-2 bg-[#e4086f] rounded-full"
            style={{ width: `${((value - min) / (displayMax - min)) * 100}%` }}
          />
          
          {/* Draggable circle */}
          <div 
            className="absolute w-8 h-8 rounded-full bg-white border-4 border-[#e4086f] -mt-3 -ml-4 shadow"
            style={{ 
              left: `${((value - min) / (displayMax - min)) * 100}%`,
              transform: 'translateX(-50%)',
              top: '50%' 
            }}
          />
        </div>
      </div>
      
      {/* Tick marks with values */}
      <div className="flex justify-between mt-4 px-1">
        {ticks.map((tick, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="h-4 w-0.5 bg-[#cfcfcf]"></div>
            <span className="text-2xl font-bold font-karla mt-2">{tick}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableProgressBar;