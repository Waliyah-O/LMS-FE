import React from 'react';
import { BsCalendar2Fill } from 'react-icons/bs';
import { format } from 'date-fns';
import ErrorMark from '../../assets/svg/redError.svg';

const DateInput = ({
  type,
  name,
  placeholder,
  value,
  onBlur,
  onInput,
  onFocus,
  id,
  symbols,
  labelRightText,
  onChange,
  labelText,
  readOnly,
  inputSize,
  inputError,
}) => {
  const displayValue = value ? format(value, 'yyyy-MM-dd') : '';



  return (
    <>
      <div className="form-control w-full">
        {labelText && (
          <label className="label" htmlFor={id}>
            <span className="label-text text-gray-900 font-medium">
              {labelText}
              <span className="text-red-500 ml-1">{symbols}</span>
            </span>
            <span className="label-text-alt">{labelRightText}</span>
          </label>
        )}
        <div className="relative">
          <input
            className={`input input-bordered ${inputSize} ${
              inputError ? 'input-error' : ''
            } w-full placeholder-slate-400 text-gray-800 px-16`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            onInput={onInput}
            readOnly={readOnly}
          />
          {type === 'text' && (
            <div className="absolute inset-y-1 left-8 flex items-center">
              <BsCalendar2Fill className="text-gray-500 h-4 w-4" />
            </div>
          )}
        </div>
        {inputError && (
          <label className="label">
            <span className="label-text-alt text-red-600 flex gap-1">
              <img src={ErrorMark} alt="error mark" />
              {inputError}
            </span>
          </label>
        )}
      </div>
    </>
  );
};

export default DateInput;
