import ErrorMark from '../../assets/svg/redError.svg';

const CheckBox = ({ options = [], className, onBlur, name, labelText, inputError, id, checked }) => {
  return (
    <div>
      <label className="label" htmlFor={id}>
        <span className="label-text text-lg">{labelText}</span>
      </label>

      <div className="relative">
        {options.map((option) => (
          <label key={option.position} className="flex py-1">
            <input
              className={`checkbox ${inputError ? 'input-error' : ''} ${className || ''}`}
              type="checkBox"
              name={name}
              onBlur={onBlur}
              value={option.position}
              checked={checked}
              onChange={() => console.log('checked')}
            />
            <span className="mx-3">{option.label}</span>
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

export default CheckBox;
