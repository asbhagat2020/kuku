import Image from 'next/image';  
import React, { useState, useRef, useEffect } from 'react';  
  
const DraggableProgressBar = ({ min = 0, max = 100, step = 1, setSelectedScale }) => {  
  const [value, setValue] = useState(min);  
  const barRef = useRef(null);  
  
  const handleMouseDown = (e) => {  
   const updateValue = (clientX) => {  
    if (barRef.current) {  
      const rect = barRef.current.getBoundingClientRect();  
      const percentage = (clientX - rect.left) / rect.width;  
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;  
      setValue(Math.max(min, Math.min(max, newValue)));  
      setSelectedScale(newValue);  
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
  
  return (  
   <div className="w-full max-w-[] mx-auto mt-8">  
    {/* <div className="mb-2 text-center text-lg font-semibold">{value}</div> */}  
    <div  
      ref={barRef}  
      className="h-[8px] bg-gray-200 cursor-pointer relative z-10 flex items-center"  
      onMouseDown={handleMouseDown}  
    >  
      <div  
       className="h-[15px] bg-[#e4086f] transition-all duration-100 ease-out"  
       style={{ width: `${((value - min) / (max - min)) * 100}%` }}  
      >  
      </div>  
      <Image className='ml-[-2px]' src='pink_eclipse.svg' width={40} height={40} alt='eclipse'/>  
    </div>  
    <div className='flex justify-between mt-[2px] ml-5'>  
    <div className='flex flex-col'>  
       <div className="w-[28.09px] h-[0px] origin-top-left rotate-90 border-2 border-[#cfcfcf] "></div>  
       <p className="origin-top-left mt-8 ml-[-10px] text-[32px] font-karla font-bold">5</p>  
      </div>  
      <div className="w-[28.09px] h-[0px] origin-top-left rotate-90 border-2 border-[#cfcfcf] "></div>  
      <div className='flex flex-col'>  
       <div className="w-[28.09px] h-[0px] origin-top-left rotate-90 border-2 border-[#cfcfcf] "></div>  
       <p className="origin-top-left mt-8 ml-[-10px] text-[32px] font-karla font-bold">15</p>  
      </div>  
  
      <div className="w-[28.09px] h-[0px] origin-top-left rotate-90 border-2 border-[#cfcfcf] "></div>  
      <div className="w-[28.09px] h-[0px] origin-top-left rotate-90 border-2 border-[#cfcfcf] "></div>  
      <div className="w-[28.09px] h-[0px] origin-top-left rotate-90 border-2 border-[#cfcfcf] "></div>  
      <div className='flex flex-col'>  
       <div className="w-[28.09px] h-[0px] origin-top-left rotate-90 border-2 border-[#cfcfcf] "></div>  
       <p className="origin-top-left mt-8 ml-[-10px] text-[32px] font-karla font-bold">35</p>  
      </div>  
    </div>  
   </div>  
  );  
};  
  
export default DraggableProgressBar;