










// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// const months = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'
// ];

// const CustomCalendar = ({ onSelectDateRange, productData }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [isSelectingEnd, setIsSelectingEnd] = useState(false);
//   const [unavailableDates, setUnavailableDates] = useState([]);
//   const [hoverDate, setHoverDate] = useState(null);

//   // Process rental data and calculate unavailable dates
//   useEffect(() => {
//     if (productData?.product?.rent) {
//       console.log('Processing rental data:', productData.product.rent);
      
//       const allUnavailableDates = [];
      
//       productData.product.rent.forEach((rental, index) => {
//         if (rental.status === 'Active') {
//           const startDate = new Date(rental.startDate);
//           const endDate = new Date(rental.endDate);
          
//           console.log(`Rental ${index + 1}:`, {
//             start: startDate.toDateString(),
//             end: endDate.toDateString()
//           });
          
//           // Add rental period dates
//           const currentRentalDate = new Date(startDate);
//           while (currentRentalDate <= endDate) {
//             allUnavailableDates.push(new Date(currentRentalDate));
//             currentRentalDate.setDate(currentRentalDate.getDate() + 1);
//           }
          
//           // Add buffer dates (2 days before and after)
//           const bufferStart1 = new Date(startDate);
//           bufferStart1.setDate(bufferStart1.getDate() - 1);
//           const bufferStart2 = new Date(startDate);
//           bufferStart2.setDate(bufferStart2.getDate() - 2);
          
//           const bufferEnd1 = new Date(endDate);
//           bufferEnd1.setDate(bufferEnd1.getDate() + 1);
//           const bufferEnd2 = new Date(endDate);
//           bufferEnd2.setDate(bufferEnd2.getDate() + 2);
          
//           allUnavailableDates.push(bufferStart1, bufferStart2, bufferEnd1, bufferEnd2);
          
//           console.log(`Buffer dates for rental ${index + 1}:`, {
//             before: [bufferStart2.toDateString(), bufferStart1.toDateString()],
//             after: [bufferEnd1.toDateString(), bufferEnd2.toDateString()]
//           });
//         }
//       });
      
//       setUnavailableDates(allUnavailableDates);
//       console.log('Total unavailable dates:', allUnavailableDates.length);
//     }
//   }, [productData]);

//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

//   const handlePrevMonth = () => {
//     setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
//   };

//   const isDateUnavailable = (date) => {
//     if (!date) return false;
//     const dateStr = date.toDateString();
//     return unavailableDates.some(unavailableDate => 
//       unavailableDate.toDateString() === dateStr
//     );
//   };

//   const isDateInRange = (date) => {
//     if (!startDate) return false;
//     if (!endDate && hoverDate && isSelectingEnd) {
//       return date >= startDate && date <= hoverDate;
//     }
//     if (!endDate) return date.toDateString() === startDate.toDateString();
//     return date >= startDate && date <= endDate;
//   };

//   // Check if there are any unavailable dates in the range
//   const hasUnavailableDatesInRange = (start, end) => {
//     if (!start || !end) return false;
    
//     const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
//     const diffDays = Math.round(Math.abs((end - start) / oneDay));
    
//     for (let i = 1; i < diffDays; i++) {
//       const currentDate = new Date(start);
//       currentDate.setDate(currentDate.getDate() + i);
//       if (isDateUnavailable(currentDate)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const handleMouseEnter = (day) => {
//     if (startDate && !endDate && isSelectingEnd) {
//       const hoverDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//       setHoverDate(hoverDate);
//     }
//   };

//   const handleMouseLeave = () => {
//     setHoverDate(null);
//   };

//   const handleDateClick = (day) => {
//     const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Don't allow selection of past dates
//     if (clickedDate < today) return;
    
//     // Don't allow selection of unavailable dates
//     if (isDateUnavailable(clickedDate)) {
//       console.log('Date is unavailable:', clickedDate.toDateString());
//       return;
//     }

//     if (!startDate || (startDate && endDate)) {
//       // Reset and start new selection
//       setStartDate(clickedDate);
//       setEndDate(null);
//       setIsSelectingEnd(true);
//       onSelectDateRange(clickedDate, null);
//       console.log('Start date selected:', clickedDate.toDateString());
//     } else if (startDate && !endDate) {
//       // Selecting end date
//       if (clickedDate < startDate) {
//         // If clicked date is before start date, make it the new start date
//         setStartDate(clickedDate);
//         setEndDate(null);
//         onSelectDateRange(clickedDate, null);
//         console.log('New start date selected:', clickedDate.toDateString());
//       } else {
//         // Check if there are any unavailable dates in the range
//         if (!hasUnavailableDatesInRange(startDate, clickedDate)) {
//           setEndDate(clickedDate);
//           setIsSelectingEnd(false);
//           onSelectDateRange(startDate, clickedDate);
//           console.log('End date selected:', clickedDate.toDateString());
//           console.log('Range selected:', startDate.toDateString(), 'to', clickedDate.toDateString());
//         } else {
//           // Invalid range due to unavailable dates in between
//           console.log('Invalid range: unavailable dates exist between selected dates');
//           // Alert the user
//           alert('Cannot select this range as there are unavailable dates in between. Please select consecutive available dates.');
//           // Keep the start date but don't set the end date
//         }
//       }
//     }
//   };

//   const clearSelection = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setIsSelectingEnd(false);
//     onSelectDateRange(null, null);
//   };

//   const renderCalendarDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const daysInMonth = getDaysInMonth(year, month);
//     const firstDayOfMonth = getFirstDayOfMonth(year, month);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const days = [];
    
//     // Empty cells for days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
//     }

//     // Days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const currentDayDate = new Date(year, month, day);
//       const isStart = startDate?.getDate() === day && 
//                      startDate?.getMonth() === month && 
//                      startDate?.getFullYear() === year;
//       const isEnd = endDate?.getDate() === day && 
//                    endDate?.getMonth() === month && 
//                    endDate?.getFullYear() === year;
//       const isInRange = isDateInRange(currentDayDate);
//       const isBeforeToday = currentDayDate < today;
//       const isUnavailable = isDateUnavailable(currentDayDate);
      
//       // Calculate if this would be a valid end date if selected
//       let wouldBreakConsecutivity = false;
//       if (startDate && !endDate && currentDayDate > startDate && !isUnavailable) {
//         wouldBreakConsecutivity = hasUnavailableDatesInRange(startDate, currentDayDate);
//       }

//       let dayClasses = `h-10 w-10 flex items-center justify-center rounded-full border text-sm font-medium `;
      
//       if (isBeforeToday) {
//         // Past dates - gray and disabled
//         dayClasses += 'bg-gray-200 cursor-not-allowed border-gray-300 opacity-50 text-gray-500';
//       } else if (isUnavailable) {
//         // All unavailable dates (rental + buffer) - simple disabled style
//         dayClasses += 'bg-gray-100 cursor-not-allowed border-gray-300 text-gray-400 opacity-60';
//       } else if (wouldBreakConsecutivity) {
//         // Date would break consecutivity - indicate with warning style
//         dayClasses += 'bg-red-50 border-red-300 cursor-not-allowed text-red-400';
//       } else if (isStart || isEnd) {
//         // Start or end date - yellow with black border
//         dayClasses += 'bg-[#FDE504] border-2 border-black cursor-pointer font-bold';
//       } else if (isInRange) {
//         // Dates in selected range - light yellow
//         dayClasses += 'bg-yellow-100 border-yellow-300 cursor-pointer';
//       } else {
//         // Available dates - white with hover effect
//         dayClasses += 'border-gray-300 cursor-pointer hover:bg-[#FDE504] hover:border-[#FDE504]';
//       }

//       days.push(
//         <div
//           key={day}
//           onClick={() => handleDateClick(day)}
//           onMouseEnter={() => handleMouseEnter(day)}
//           onMouseLeave={handleMouseLeave}
//           className={dayClasses}
//           title={
//             isUnavailable ? 'Unavailable' :
//             isBeforeToday ? 'Past date' :
//             wouldBreakConsecutivity ? 'Cannot select - would break consecutive dates' :
//             isStart ? 'Start date' :
//             isEnd ? 'End date' :
//             isInRange ? 'In selected range' :
//             'Available'
//           }
//         >
//           {day}
//         </div>
//       );
//     }

//     return days;
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
//         <button 
//           onClick={handlePrevMonth} 
//           className="p-1 rounded-full hover:bg-gray-200 focus:outline-none transition-colors"
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </button>
//         <h2 className="text-lg font-semibold text-gray-800">
//           {months[currentDate.getMonth()]} {currentDate.getFullYear()}
//         </h2>
//         <button 
//           onClick={handleNextMonth} 
//           className="p-1 rounded-full hover:bg-gray-200 focus:outline-none transition-colors"
//         >
//           <ChevronRight className="h-6 w-6" />
//         </button>
//       </div>
      
//       <div className="p-4">
//         {/* Selection Status */}
//         <div className="mb-4 p-2 bg-blue-50 rounded-md">
//           <div className="text-sm font-medium text-blue-800">
//             {!startDate ? (
//               "Select start date"
//             ) : !endDate ? (
//               `Start: ${startDate.toLocaleDateString('en-GB')} - Now select end date (consecutive only)`
//             ) : (
//               `Range: ${startDate.toLocaleDateString('en-GB')} to ${endDate.toLocaleDateString('en-GB')}`
//             )}
//           </div>
//           {(startDate || endDate) && (
//             <button
//               onClick={clearSelection}
//               className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
//             >
//               Clear selection
//             </button>
//           )}
//         </div>

//         {/* Legend */}
//         <div className="flex flex-wrap gap-2 mb-4 text-xs">
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-4 bg-gray-100 rounded-full border border-gray-300 opacity-60"></div>
//             <span>Unavailable</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-4 bg-[#FDE504] rounded-full border border-black"></div>
//             <span>Start/End</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-4 bg-yellow-100 rounded-full border border-yellow-300"></div>
//             <span>Selected Range</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-4 bg-red-50 rounded-full border border-red-300"></div>
//             <span>Breaks Consecutivity</span>
//           </div>
//         </div>

//         <hr className="my-3 border-t border-gray-200" />
        
//         {/* Days of week header */}
//         <div className="grid grid-cols-7 gap-2 mb-2">
//           {daysOfWeek.map(day => (
//             <div key={day} className="text-center font-medium text-gray-600 text-sm py-1">
//               {day}
//             </div>
//           ))}
//         </div>
        
//         {/* Calendar grid */}
//         <div className="grid grid-cols-7 gap-2">
//           {renderCalendarDays()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomCalendar;










import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CustomCalendar = ({ onSelectDateRange, productData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [hoverDate, setHoverDate] = useState(null);

  // Process rental data and calculate unavailable dates
  useEffect(() => {
    if (productData?.product?.rent) {
      console.log('Processing rental data:', productData.product.rent);
      
      const allUnavailableDates = [];
      
      productData.product.rent.forEach((rental, index) => {
        if (rental.status === 'Active') {
          const startDate = new Date(rental.startDate);
          const endDate = new Date(rental.endDate);
          
          console.log(`Rental ${index + 1}:`, {
            start: startDate.toDateString(),
            end: endDate.toDateString()
          });
          
          // Add rental period dates
          const currentRentalDate = new Date(startDate);
          while (currentRentalDate <= endDate) {
            allUnavailableDates.push(new Date(currentRentalDate));
            currentRentalDate.setDate(currentRentalDate.getDate() + 1);
          }
          
          // Add buffer dates (2 days before and after)
          const bufferStart1 = new Date(startDate);
          bufferStart1.setDate(bufferStart1.getDate() - 1);
          const bufferStart2 = new Date(startDate);
          bufferStart2.setDate(bufferStart2.getDate() - 2);
          
          const bufferEnd1 = new Date(endDate);
          bufferEnd1.setDate(bufferEnd1.getDate() + 1);
          const bufferEnd2 = new Date(endDate);
          bufferEnd2.setDate(bufferEnd2.getDate() + 2);
          
          allUnavailableDates.push(bufferStart1, bufferStart2, bufferEnd1, bufferEnd2);
          
          console.log(`Buffer dates for rental ${index + 1}:`, {
            before: [bufferStart2.toDateString(), bufferStart1.toDateString()],
            after: [bufferEnd1.toDateString(), bufferEnd2.toDateString()]
          });
        }
      });
      
      setUnavailableDates(allUnavailableDates);
      console.log('Total unavailable dates:', allUnavailableDates.length);
    }
  }, [productData]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const isDateUnavailable = (date) => {
    if (!date) return false;
    const dateStr = date.toDateString();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Calculate tomorrow's date

    // Check if the date is today or tomorrow
    if (date.toDateString() === today.toDateString() || date.toDateString() === tomorrow.toDateString()) {
      return true; // Block current date and next day
    }

    // Check if the date is in unavailableDates (from rental data)
    return unavailableDates.some(unavailableDate => 
      unavailableDate.toDateString() === dateStr
    );
  };

  const isDateInRange = (date) => {
    if (!startDate) return false;
    if (!endDate && hoverDate && isSelectingEnd) {
      return date >= startDate && date <= hoverDate;
    }
    if (!endDate) return date.toDateString() === startDate.toDateString();
    return date >= startDate && date <= endDate;
  };

  // Check if there are any unavailable dates in the range
  const hasUnavailableDatesInRange = (start, end) => {
    if (!start || !end) return false;
    
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const diffDays = Math.round(Math.abs((end - start) / oneDay));
    
    for (let i = 1; i < diffDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + i);
      if (isDateUnavailable(currentDate)) {
        return true;
      }
    }
    return false;
  };

  const handleMouseEnter = (day) => {
    if (startDate && !endDate && isSelectingEnd) {
      const hoverDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setHoverDate(hoverDate);
    }
  };

  const handleMouseLeave = () => {
    setHoverDate(null);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow selection of past dates, today, or tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (clickedDate <= tomorrow) {
      console.log('Date is unavailable (past, today, or tomorrow):', clickedDate.toDateString());
      return;
    }
    
    // Don't allow selection of unavailable dates
    if (isDateUnavailable(clickedDate)) {
      console.log('Date is unavailable:', clickedDate.toDateString());
      return;
    }

    if (!startDate || (startDate && endDate)) {
      // Reset and start new selection
      setStartDate(clickedDate);
      setEndDate(null);
      setIsSelectingEnd(true);
      onSelectDateRange(clickedDate, null);
      console.log('Start date selected:', clickedDate.toDateString());
    } else if (startDate && !endDate) {
      // Selecting end date
      if (clickedDate < startDate) {
        // If clicked date is before start date, make it the new start date
        setStartDate(clickedDate);
        setEndDate(null);
        onSelectDateRange(clickedDate, null);
        console.log('New start date selected:', clickedDate.toDateString());
      } else {
        // Check if there are any unavailable dates in the range
        if (!hasUnavailableDatesInRange(startDate, clickedDate)) {
          setEndDate(clickedDate);
          setIsSelectingEnd(false);
          onSelectDateRange(startDate, clickedDate);
          console.log('End date selected:', clickedDate.toDateString());
          console.log('Range selected:', startDate.toDateString(), 'to', clickedDate.toDateString());
        } else {
          // Invalid range due to unavailable dates in between
          console.log('Invalid range: unavailable dates exist between selected dates');
          alert('Cannot select this range as there are unavailable dates in between. Please select consecutive available dates.');
        }
      }
    }
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setIsSelectingEnd(false);
    onSelectDateRange(null, null);
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); // Add tomorrow
    tomorrow.setDate(today.getDate() + 1); // Calculate tomorrow's date

    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(year, month, day);
      const isStart = startDate?.getDate() === day && 
                     startDate?.getMonth() === month && 
                     startDate?.getFullYear() === year;
      const isEnd = endDate?.getDate() === day && 
                   endDate?.getMonth() === month && 
                   endDate?.getFullYear() === year;
      const isInRange = isDateInRange(currentDayDate);
      const isBeforeToday = currentDayDate < today;
      const isTodayOrTomorrow = currentDayDate.toDateString() === today.toDateString() || 
                               currentDayDate.toDateString() === tomorrow.toDateString();
      const isUnavailable = isDateUnavailable(currentDayDate);
      
      // Calculate if this would be a valid end date if selected
      let wouldBreakConsecutivity = false;
      if (startDate && !endDate && currentDayDate > startDate && !isUnavailable) {
        wouldBreakConsecutivity = hasUnavailableDatesInRange(startDate, currentDayDate);
      }

      let dayClasses = `h-10 w-10 flex items-center justify-center rounded-full border text-sm font-medium `;
      
      if (isBeforeToday || isTodayOrTomorrow) {
        // Past dates, today, and tomorrow - gray and disabled
        dayClasses += 'bg-gray-200 cursor-not-allowed border-gray-300 opacity-50 text-gray-500';
      } else if (isUnavailable) {
        // All unavailable dates (rental + buffer) - simple disabled style
        dayClasses += 'bg-gray-100 cursor-not-allowed border-gray-300 text-gray-400 opacity-60';
      } else if (wouldBreakConsecutivity) {
        // Date would break consecutivity - indicate with warning style
        dayClasses += 'bg-red-50 border-red-300 cursor-not-allowed text-red-400';
      } else if (isStart || isEnd) {
        // Start or end date - yellow with black border
        dayClasses += 'bg-[#FDE504] border-2 border-black cursor-pointer font-bold';
      } else if (isInRange) {
        // Dates in selected range - light yellow
        dayClasses += 'bg-yellow-100 border-yellow-300 cursor-pointer';
      } else {
        // Available dates - white with hover effect
        dayClasses += 'border-gray-300 cursor-pointer hover:bg-[#FDE504] hover:border-[#FDE504]';
      }

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          onMouseEnter={() => handleMouseEnter(day)}
          onMouseLeave={handleMouseLeave}
          className={dayClasses}
          title={
            isBeforeToday ? 'Past date' :
            isTodayOrTomorrow ? 'Today or Tomorrow - Unavailable' :
            isUnavailable ? 'Unavailable' :
            wouldBreakConsecutivity ? 'Cannot select - would break consecutive dates' :
            isStart ? 'Start date' :
            isEnd ? 'End date' :
            isInRange ? 'In selected range' :
            'Available'
          }
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
        <button 
          onClick={handlePrevMonth} 
          className="p-1 rounded-full hover:bg-gray-200 focus:outline-none transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button 
          onClick={handleNextMonth} 
          className="p-1 rounded-full hover:bg-gray-200 focus:outline-none transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-4">
        {/* Selection Status */}
        <div className="mb-4 p-2 bg-blue-50 rounded-md">
          <div className="text-sm font-medium text-blue-800">
            {!startDate ? (
              "Select start date (from day after tomorrow)"
            ) : !endDate ? (
              `Start: ${startDate.toLocaleDateString('en-GB')} - Now select end date (consecutive only)`
            ) : (
              `Range: ${startDate.toLocaleDateString('en-GB')} to ${endDate.toLocaleDateString('en-GB')}`
            )}
          </div>
          {(startDate || endDate) && (
            <button
              onClick={clearSelection}
              className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Clear selection
            </button>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded-full border border-gray-300 opacity-60"></div>
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#FDE504] rounded-full border border-black"></div>
            <span>Start/End</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-100 rounded-full border border-yellow-300"></div>
            <span>Selected Range</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-50 rounded-full border border-red-300"></div>
            <span>Breaks Consecutivity</span>
          </div>
        </div>

        <hr className="my-3 border-t border-gray-200" />
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-medium text-gray-600 text-sm py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;



