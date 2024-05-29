// import React, { useEffect } from 'react';
// import searchIcon from '../..//assets/svg/search.svg';

// function SearchBar({ searchText, styleClass, placeholderText, setSearchText, className }) {
//   const updateSearchInput = (value) => {
//     setSearchText(value);
//   };

//   return (
//     <div className={' w-full inline-block ' + styleClass}>
//       <div className="hidden px-4 relative lg:block order-first w-full ">
        
//         <input
//           type="search"
//           value={searchText}
//           placeholder={placeholderText || 'Search'}
//           onChange={(e) => updateSearchInput(e.target.value)}
//           className={`input input-sm bg-white-600 text-gray-300 w-72 pl-8 ${className}`}
//         />
//         <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
//           <img src={searchIcon} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;


import React from 'react';
import PropTypes from 'prop-types';

import searchIcon from '../../assets/svg/search.svg'

function SearchBar({
  searchText,
  styleClass,
  placeholderText = 'Search',
  setSearchText,
  className = '',
}) {
  const updateSearchInput = (value) => {
    setSearchText(value);
  };

  return (
    <div className={`w-full inline-block ${styleClass}`}>
      <div className="hidden px-4 relative lg:block order-first w-full">
        <input
          type="search"
          value={searchText}
          placeholder={placeholderText}
          onChange={(e) => updateSearchInput(e.target.value)}
          className={`input input-sm bg-white-600 text-gray-300 w-72 pl-8 ${className}`}
        />
        {searchText === '' && (
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <img src={searchIcon} alt="Search Icon" />
          </div>
        )}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  styleClass: PropTypes.string,
  placeholderText: PropTypes.string,
  setSearchText: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SearchBar;
