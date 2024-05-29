const Dropdown = ({ dropDownType, items, text }) => {
  return (
    <div className={`dropdown ${dropDownType}`}>
      <div tabIndex={0} role="button" className="btn m-1">
        {text}
      </div>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {items &&
          items.map((item, index) => (
            <li key={index}>
              <a>{item}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
