'use client';

import React from 'react';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation'; 
import { useFilter } from '../context/FilterContext';

export const MegaActiveFilters = () => {
  const { filters, toggleFilter, clearFilters } = useFilter();
  const router = useRouter();

  const activeFiltersCount = Object.values(filters).reduce(
    (count, filterGroup) => count + filterGroup.length,
    0
  );

  if (activeFiltersCount === 0) {
    return null;
  }

  const handleRemoveFilter = (type, value) => {
    toggleFilter(type, value);

    if (type === 'category') {
      router.push('/selling-page');
    }
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-700">Active Filters ({activeFiltersCount})</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([type, values]) =>
          values.map((value) => (
            <div
              key={`${type}-${value}`}
              className="flex items-center bg-gray-100 rounded-full pl-3 pr-2 py-1 text-sm"
            >
              <span className="text-gray-800 mr-1">{type}:</span>
              <span className="font-medium">{value}</span>
              <button
                onClick={() => handleRemoveFilter(type, value)}
                className="ml-1 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FiX size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MegaActiveFilters;
