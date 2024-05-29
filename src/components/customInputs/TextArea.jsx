import ErrorMark from '../../assets/svg/redError.svg';

const TextArea = ({
  id,
  placeholder,
  name,
  onChange,
  onBlur,
  value,
  labelText,
  labelRightText,
  inputError,
  inputErrorRight,
  className,
  readOnly,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={id}>
        <span className="label-text text-gray-900 font-medium">{labelText}</span>
        <span className="label-text-alt">{labelRightText}</span>
      </label>

      <div className="relative">
        <textarea
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          readOnly={readOnly}
          value={value}
          className={`textarea textarea-bordered w-full ${inputError ? 'textarea-error' : ''} ${className || ''}`}
          placeholder={placeholder}
        ></textarea>
      </div>

      {inputError && (
        <label className="label">
          <span className="label-text-alt text-red-600 flex gap-1">
            <img src={ErrorMark} alt="error mark" />
            {inputError}
          </span>
          <span className="label-text-alt">{inputErrorRight}</span>
        </label>
      )}
    </div>
  );
};

export default TextArea;
