// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import { Calendar } from 'lucide-react';
// import 'react-datepicker/dist/react-datepicker.css';

// const CustomDateInput = ({ placeholder, name, value, onChange, error }) => {
//   const [startDate, setStartDate] = useState(value ? new Date(value) : null);

//   const handleChange = (date) => {
//     setStartDate(date);
//     onChange({ target: { name, value: date ? date.toISOString().split('T')[0] : '' } });
//   };

//   const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
//     <div className="relative w-full cursor-pointer" onClick={onClick} ref={ref}>
//       <input
//         value={value}
//         className="lg:w-[400px] h-[50px] px-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 outline-none"
//         readOnly
//       />
//       <span
//         className={`absolute left-5 transition-all ${
//           value ? 'text-xs text-blue-500 -translate-y-3 bg-white px-1' : 'text-gray-500 top-3 font-karla'
//         }`}
//       >
//         {placeholder}
//       </span>
//       <Calendar className="absolute right-5 top-3 text-pink-600" size={20} />
//     </div>
//   ));

//   CustomInput.displayName = 'CustomInput';

//   return (
//     <div className="w-full sm:w-1/2">
//       <DatePicker
//         selected={startDate}
//         onChange={handleChange}
//         customInput={<CustomInput />}
//         dateFormat="yyyy-MM-dd"
//         minDate={new Date()} // Ensure only current and future dates can be selected
//         popperPlacement="bottom-start" // Ensure the calendar appears below the input
//         popperProps={{
//           modifiers: [
//             {
//               name: 'preventOverflow',
//               options: {
//                 boundary: 'viewport',
//               },
//             },
//             {
//               name: 'offset',
//               options: {
//                 offset: [0, 8], // Adjust spacing if necessary
//               },
//             },
//           ],
//         }}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default CustomDateInput;










import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDateInput = ({ placeholder, name, value, onChange, error, minDate, maxDate }) => {
  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  const handleChange = (date) => {
    setStartDate(date);
    onChange({ target: { name, value: date ? date.toISOString().split('T')[0] : '' } });
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative w-full cursor-pointer" onClick={onClick} ref={ref}>
      <input
        value={value}
        className="lg:w-[400px] h-[50px] px-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 outline-none"
        readOnly
      />
      <span
        className={`absolute left-5 transition-all ${
          value ? 'text-xs text-blue-500 -translate-y-3 bg-white px-1' : 'text-gray-500 top-3 font-karla'
        }`}
      >
        {placeholder}
      </span>
      <Calendar className="absolute right-5 top-3 text-pink-600" size={20} />
    </div>
  ));

  CustomInput.displayName = 'CustomInput';

  return (
    <div className="w-full sm:w-1/2">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        customInput={<CustomInput />}
        dateFormat="yyyy-MM-dd"
        minDate={minDate ? new Date(minDate) : new Date()}
        maxDate={maxDate ? new Date(maxDate) : null}
        popperPlacement="bottom-start"
        popperProps={{
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
              },
            },
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomDateInput;
