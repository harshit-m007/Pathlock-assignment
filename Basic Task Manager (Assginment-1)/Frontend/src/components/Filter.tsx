import React from 'react';
import { FilterType } from '../types/Task';

interface FilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const Filter: React.FC<FilterProps> = ({ filter, onFilterChange }) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
            filter === f.value
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};



