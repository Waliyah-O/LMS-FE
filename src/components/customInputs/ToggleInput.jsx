function ToggleInput({ name, onBlur, onChange, checked, classNameEnabled, classNameDisabled }) {
  const toggleClassName = checked ? classNameEnabled : classNameDisabled;

  return (
    <div className={`form-control w-full`}>
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className={`toggle ${toggleClassName}`}
          checked={checked}
          name={name}
          onChange={(event) => onChange(event, name)}
          onBlur={onBlur}
        />
      </label>
    </div>
  );
}

export default ToggleInput;
