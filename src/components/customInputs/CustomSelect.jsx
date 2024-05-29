import ErrorMark from '../../assets/svg/redError.svg';

const CustomSelect = ({
  onBlur,
  name,
  onChange,
  labelText,
  rightLabel,
  optionText,
  rightErrorText,
  className,
  options = [],
  errorText,
  value,
  symbols,
}) => {
  const hasError = errorText !== undefined;

  return (
    <div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">
            {labelText} <span className="text-red-500">{symbols}</span>
          </span>
          <span className="label-text-alt">{rightLabel}</span>
        </label>

        <select
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          className={`select select-bordered w-full ${hasError && !value ? 'select-error' : ''} ${className || ''}`}
        >
          <option disabled selected value={''}>
            {optionText}
          </option>
          {options.map((option) => (
            <option key={option.position} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {!value && errorText && (
          <label className="label">
            <span className="label-text-alt text-red-600 flex gap-1">
              <img src={ErrorMark} alt="error mark" />
              {errorText}
            </span>
            <span className="label-text-alt">{rightErrorText}</span>
          </label>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
