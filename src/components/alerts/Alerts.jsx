const Alerts = ({ alertText, alertStyle, alertType, title, buttonText }) => {
  return (
    <div className="w-full">
      <div role="alert" className={`alert ${alertStyle} w-1/2`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={alertType}></path>
        </svg>
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-sm">{alertText}</div>
        </div>
        {buttonText && <button className="btn btn-sm">{buttonText}</button>}
      </div>
    </div>
  );
};

export default Alerts;
