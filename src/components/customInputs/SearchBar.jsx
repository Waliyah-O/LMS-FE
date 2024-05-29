

import React, { useState } from 'react';

const SearchBar = ({ onChange, styleClass, placeholderText, customStyles  }) => {

  return (
    <div  className={'inline-block ' + styleClass}>
      
    <form onSubmit={(e) => e.preventDefault()}  className={`input-group  relative flex flex-wrap items-stretch w-full `}>
      <input
        type="text"
        placeholder={placeholderText || 'Search...'}
        onChange={onChange}
        className={`input input-bordered ${customStyles}`}
      />
      {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Search
      </button> */}
    </form>
    </div>
  );
};

export default SearchBar;

/*************USE CASE********* */
// PArent component
{/* <SearchBar onChange={(e) => onChange(e.target.value)} customStyles="input-sm placeholder-slate-400 text-gray-800 pl-8 w-[20rem] lg:w-[26rem]"/> */}

// GrandParentCOmponent

// <TopSideButtons colored buttonText={'Create a program'} onClick={() => openAddNewProgramModal()} onChange={handleSearch} />
