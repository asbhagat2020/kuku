import Image from 'next/image'
import React, { useState } from 'react'

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const mockSuggestions = [
        'T-shirt',
        'Jacket',
        'Jeans',
        'Shoes',
        'Socks'
      ].filter(item => item.toLowerCase().includes(value.toLowerCase()));

      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  return (
    <div className="max-w-full px-[70px] py-[23px] h-[108px] bg-[#EDA702]">
      <div className='flex justify-between'>
        <div className='flex gap-[60px]'>
          <div className="flex gap-[1rem] items-center">
            <Image src='kuku_logo.svg' width={56} height={61} />
            <h1 className="text-black text-[37px] font-bold font-palanquin_dark leading-[44.40px]">KUKU</h1>
          </div>
          <div className='flex gap-[30px] items-center'>
            <p className="text-[#fefae5] text-base font-bold font-karla leading-tight">MEN</p>
            <p className="text-[#fefae5] text-base font-bold font-karla leading-tight">WOMEN</p>
            <p className="text-[#fefae5] text-base font-bold font-karla leading-tight">KIDS</p>
          </div>
        </div>
        <div className="flex gap-[10px] items-center">
          {isSearchVisible ? (
            <div className='relative w-[500px] h-[54px]'>
              <input
                className='w-full h-full bg-white rounded-lg px-[50px] outline-none'
                type="search"
                placeholder="search an item"
                autoFocus
                value={searchValue}
                onChange={handleInputChange}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Image alt='search icon' width={24} height={24} src='search_button.svg' />
              </div>

              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-bl-lg rounded-br-lg mt-1 z-10">
                  {suggestions.map((suggestion, index) => (
                    <React.Fragment key={index}>
                      <div
                        className="px-4 py-7 cursor-pointer hover:bg-gray-100 font-karla flex justify-between gap-4"
                      >
                        <div className="flex gap-4">
                          <Image width={24} height={24} src='search_button.svg' />
                          <p className="text-[#070707] text-base font-normal font-karla leading-snug tracking-tight">{suggestion}</p>
                        </div>
                        <Image width={24} height={24} src='arrow-up-right.svg' />
                      </div>

                      {/* Conditionally render the line */}
                      {index !== suggestions.length - 1 && (
                        <div className='w-[95%] mx-auto h-[1px] bg-[#383838]'></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              className='h-[54px] p-[15px] bg-[#393939] rounded-[100px] cursor-pointer'
              onClick={toggleSearch}
            >
              <Image alt='search icon' width={24} height={24} src='search.svg' />
            </div>
          )}

          <div className='h-[54px] p-[15px] bg-white/40 rounded-[100px]'>
            <Image alt='notification icon' width={24} height={24} src='notification.svg' />
          </div>
          <div className='h-[54px] p-[15px] bg-white/40 rounded-[100px]'>
            <Image alt='cart icon' width={24} height={24} src='cart.svg' />
          </div>
          <div className='h-[54px] p-[15px] bg-white/40 rounded-[100px]'>
            <Image alt='wishlist icon' width={24} height={24} src='wishlist.svg' />
          </div>
          <div className='h-[54px] p-[15px] bg-[#393939] rounded-[100px]'>
            <Image alt='profile icon' width={24} height={24} src='profile.svg' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
