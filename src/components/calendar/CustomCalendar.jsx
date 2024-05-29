import { useState } from 'react';
import Calendar from 'react-calendar';
import './customCalendar.css';
import Button from '../button';
import { ButtonSize, ButtonState } from '../button/enum';

const CustomCalendar = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onSelect) {
      onSelect(date);
    }
  };

  const handleClearSelection = (e) => {
    setSelectedDate('');
    e.preventDefault();
    if (onSelect) {
      onSelect('');
    }
  };
  const today = new Date();

  return (
    <div className="w-fit flex flex-col my-8 p-4 rounded-lg card-shadow mx-auto lg:mx-0">
      <Calendar
        calendarType="gregory"
        onChange={handleDateChange}
        value={selectedDate}
        formatShortWeekday={(locale, date) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}
        tileClassName={({ date, view }) =>
          view === 'month' && selectedDate && date.toString() === selectedDate.toString()
            ? 'text-white bg-red-600 font-extrabold'
            : isToday(date)
            ? 'bg-slate-400 text-white font-extrabold'
            : 'font-extrabold'
        }
      />
      {!selectedDate && <p className="text-red-550 text-center font-semibold">Please select a date before submitting</p>}
      {selectedDate && selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && (
        <p className={`text-red-550 text-center font-semibold  ${!selectedDate ? 'hidden' : 'block'}`}>
          Selected date cannot be in the past
        </p>
      )}
      <Button
        className="font-semibold"
        onClick={handleClearSelection}
        value="Clear"
        variant={ButtonState.LIST}
        size={ButtonSize.sm}
      />
    </div>
  );
};

export default CustomCalendar;
