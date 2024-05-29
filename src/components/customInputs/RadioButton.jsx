import './radio.css';

const RadioButton = ({ option = { label: '', position: 0 }, className, value, onChange, checked }) => {
  return (
    <>
      <div className={className}>
        <div className="radio-button">
          <input
            name="radio-group"
            id={`radio-${option.position}`}
            className="radio-button__input"
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={`radio-${option.position}`} className="radio-button__label text-labels md:text-small">
            <span className="radio-button__custom"></span>
            {option.label}
          </label>
        </div>
      </div>
    </>
  );
};

export default RadioButton;
