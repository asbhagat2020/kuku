import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const SettingsDropdown = ({isOpen, onToggle}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500 z-0"
        >
          <span className="font-bold ">Setting</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {isOpen && (
          <div className="w-full bg-white shadow-lg overflow-y-auto">
          <style jsx>{`
            .thin-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #e5e7eb transparent;
            }
            .thin-scrollbar::-webkit-scrollbar {
              width: 2px;
            }
            .thin-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .thin-scrollbar::-webkit-scrollbar-thumb {
              background-color: #e5e7eb;
              border-radius: 20px;
            }
            .thin-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #d1d5db;
            }
          `}</style>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Notifications
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Account
            </a>
              <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Support
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;