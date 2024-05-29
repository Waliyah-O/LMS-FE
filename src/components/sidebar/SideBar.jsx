import SideBarItem from './SideBarItem';

const SideBar = () => {
  return (
    <div>
      <div className="drawer ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content dropdown text-base-100">
          <label htmlFor="my-drawer" className="drawer-button">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
          </label>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {SideBarItem.map((item, index) => (
              <div key={index} className="text-teal-800">
                <li>{item.Profile}</li>
                <li>{item.Course}</li>
                <li>{item.Result}</li>
              </div>
            ))}
          </ul>

          {/* Close button (X) */}
          <label htmlFor="my-drawer" className="drawer-close-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-teal-800 b"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
