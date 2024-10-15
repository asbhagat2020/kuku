// components/CustomCalendar.js
"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CustomCalendar = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // Default selected date is empty

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
  
    // Allow selection of today or future dates only
    if (newSelectedDate < today) return;
  
    // Check if the newly selected date is the same as the currently selected date
    if (selectedDate && newSelectedDate.getTime() === selectedDate.getTime()) {
      // Deselect the date if it is already selected
      setSelectedDate(null);
      onSelectDate(null); // Call onSelectDate with null to indicate deselection
    } else {
      // Otherwise, set the new date as selected
      setSelectedDate(newSelectedDate);
      onSelectDate(newSelectedDate); // Pass the selected date to the parent
    }
  };
  

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(year, month, day);
      const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
      const isBeforeToday = currentDayDate < today;

      days.push(
        <div
          key={day}
          onClick={() => !isBeforeToday && handleDateClick(day)}
          className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer border 
            ${isBeforeToday ? 'bg-gray-200 cursor-not-allowed border-gray-300 opacity-50' : 'border-gray-300'}
            ${isSelected ? 'bg-[#FDE504] border-2 border-black' : ''} 
            hover:bg-[#FDE504]`}
        >
        
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2">
        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-200 focus:outline-none">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-200 focus:outline-none">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4">
        <hr className="my-2 border-t border-gray-300" />
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-medium text-gray-500">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
