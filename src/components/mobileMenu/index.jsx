import { NavLink } from 'react-router-dom';
import Button from '../button';
import { ButtonSize, ButtonState } from '../button/enum';
import { useNavigate } from 'react-router-dom';

const MobileMenu = ({ menuItems }) => {
  const navigate = useNavigate();

  const closeMenu = () => {
    const drawerCheckbox = document.getElementById('my-drawer-4');
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToDemo = () => {
    navigate('/demo');
    closeMenu();
  };

  return (
    <div>
      <div className="drawer drawer-end z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className=" menu p-4 w-80 min-h-full bg-white text-base-content">
            <div className="w-full flex items-end justify-end">
              <button onClick={closeMenu} className="btn btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {menuItems &&
              menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    className={({ isActive }) => [
                      isActive
                        ? 'font-bold bg-transparent border-b-2 border-red-500 text-red-500 p-4 my-2"'
                        : 'font-semibold p-4 my-3',
                    ]}
                    to={item.to}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                  {/* <Link
                    className="font-bold bg-transparent hover:border-b-2 border-red-500 p-4 my-2"
                    to={item.to}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link> */}
                </li>
              ))}
            <div className="my-6 gap-1 w-full flex flex-col border">
              <Button variant={ButtonState.LIST} size={ButtonSize.md} value="Sign Up" onClick={goToSignUp} />
              <Button variant={ButtonState.SECONDARY} size={ButtonSize.md} value="Book a demo" onClick={goToDemo} />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
