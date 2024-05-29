import { useState } from 'react';
import RadioButton from '../components/customInputs/RadioButton';

const RadioFilters = ({ onFilterChange, radioOptions, count }) => {
  const [sortBy, setSortBy] = useState('All');

  const handleOptionChange = (selectedOption) => {
    setSortBy(selectedOption);
    onFilterChange(selectedOption);
  };

  return (
    <div className="flex flex-col text-gray-800 font-semibold pb-4 md:flex-row items-center justify-between">
      {/* <div className="flex flex-col gap-2 md:flex-row justify-between items-center w-full"> */}
      <div className="flex flex-col items-center gap-1 md:flex-row">
        <span>Show Only:</span>
        <div className="flex gap-1.5 items-center flex-wrap md:gap-4">
          {radioOptions.map((option) => (
            <RadioButton
              key={option.position}
              option={option}
              value={option.label}
              onChange={() => handleOptionChange(option.label)}
              checked={sortBy === option.label}
            />
          ))}
        </div>
      </div>

      <div className="my-1 md:my-0">
        <span className="text-labels">Records Displayed: {count ? count : '0'}</span>
      </div>
    </div>
    // </div>
  );
};

export default RadioFilters;

