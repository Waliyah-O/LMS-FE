const Toggle = ({ leftText, rightText, size, disabled, checked }) => {
  return (
    <div className="flex flex-col">
      <div className="form-control w-fit">
        <label className="cursor-pointer label gap-2">
          <span className="label-text">{leftText}</span>
          <input type="checkbox" className={`toggle ${size} toggle-success `} checked={checked} disabled={disabled} />
          <span className="label-text">{rightText}</span>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
