import React, { useState, useEffect } from 'react';
import { LuClock2 } from 'react-icons/lu';
import ErrorMark from '../../assets/svg/redError.svg';

const TimeInput = ({
  type = 'text',
  name,
  placeholder = '',
  onBlur,
  onInput,
  value,
  onFocus,
  id,
  symbols,
  labelRightText,
  onChange,
  labelText,
  readOnly = false,
  inputSize,
  inputError,
}) => {
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
              <LuClock2 className="text-gray-500 h-5 w-5" />
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

export default TimeInput;
