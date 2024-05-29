import Button from '../button';
import { ButtonSize, ButtonState } from '../button/enum';

const CustomDrawer = ({ buttonText, children }) => {
  return (
    <div className=''>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
            {buttonText}
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            <ul>
              <li>side drawer</li>
              <li>side drawer</li>
              <li>side drawer</li>
            </ul>

            {children}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomDrawer;
