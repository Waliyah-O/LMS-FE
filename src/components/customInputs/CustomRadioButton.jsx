import ErrorMark from '../../assets/svg/redError.svg';
import './radio.css';

const CustomRadioButton = ({ options = [], className, onBlur, name, labelText, inputError, id, onChange, checked }) => {
  return (
    <div>
      <label className="label" htmlFor={id}>
        <span className="label-text text-lg">{labelText}</span>
      </label>

      <div className="flex items-center gap-2">
        {options.map((option) => (
          <label key={option.position} className="flex py-1">
            <input
              className={`radio ${inputError ? 'input-error' : ''} ${className || ''}`}
              type="radio"  
              name={name}
              value={ option.value}
              onBlur={onBlur}
              checked={checked === option.label}
              onChange={onChange}
            />
            <span className={`checkmark ${inputError && 'input-error'}`}></span>
            <span className="mx-3 text-labels lg:text-sm font-semibold">{option.label}</span>
          </label>
        ))}
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
  );
};

export default CustomRadioButton;
