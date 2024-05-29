import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import '../components/CustomDateRange/rangepicker.css';
import SearchBar from './customInputs/SearchBar';
import searchIcon from '../assets/svg/search.svg';
import { BsFillFunnelFill } from 'react-icons/bs';
import Button from '../components/button';
import { ButtonState, ButtonSize } from '../components/button/enum';
import { useDispatch, useSelector } from 'react-redux';
import { updateRange } from './CalendarView/dateRangeSlice';

const TopSideButtons = ({ icon, buttonText, colored, onClick, onSearch, onChange }) => {
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const range = useSelector((state) => state.dateRange);
  const dispatch = useDispatch();

  const toggleDateRangePicker = () => {
    setShowDateRangePicker(!showDateRangePicker);
  };

  const handleDateRangeChange = (ranges) => {
    dispatch(updateRange(ranges));
  };

  return (
    <div className="flex flex-col flex-wrap my-3 md:flex-row justify-between  gap-4">
      <div className="flex flex-wrap gap-4 relative">
        <div className="relative w-full md:w-fit">
          <div className="">
            <SearchBar onChange={(e) => onChange(e.target.value)} customStyles="input-sm placeholder-slate-400 text-gray-800 pl-8 w-[20rem] lg:w-[26rem]"/>
            <div className="absolute inset-y-0 left-2 flex items-center">
              <img src={searchIcon} alt="searchicon" />
            </div>
          </div>

          <div className="absolute inset-y-0 top-[2px] right-0 flex items-center">
            <Button variant={ButtonState.SEARCH} size={ButtonSize.s} value="Search" />
          </div>
        </div>

        <div className="">
          <label className="btn btn-sm btn-outline no-animation" onClick={toggleDateRangePicker}>
            <BsFillFunnelFill />
            Filter
          </label>
        </div>
      </div>

      {showDateRangePicker && (
        <>
          <div className="hidden md:block mx-auto">
            <DateRangePicker
              rangeColors={['#D43325']}
              onChange={handleDateRangeChange}
              months={2}
              ranges={[range]}
              direction="horizontal"
            />
          </div>

          <div className="block md:hidden">
            <DateRangePicker
              rangeColors={['#D43325']}
              onChange={handleDateRangeChange}
              months={1}
              ranges={[range]}
              direction="horizontal"
            />
          </div>
        </>
      )}

      {buttonText && (
        <div className="absolute right-6 top-28 md:right-6 md:top-16 -z-100">
          <label
            onClick={onClick}
            className={`drawer-button btn btn-sm ${
              colored ? 'bg-blue-500 text-white' : 'btn-outline'
            } no-animation hover:bg-blue-500 ${colored ? '' : 'hover:text-white'}`}
          >
            {icon}
            {buttonText}
          </label>
        </div>
      )}
    </div>
  );
};

export default TopSideButtons;
