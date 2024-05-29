import { NavLink, Link, useLocation } from 'react-router-dom';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { useDispatch } from 'react-redux';
import logo from '../assets/svg/academy-logo-red-icon.svg';

function LeftSidebar({ routes }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const closeMenu = () => {
    const drawerCheckbox = document.getElementById('my-drawer-2');
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  // Separate the last two routes from the rest of the routes
  const regularRoutes = routes.slice(0, -2);
  const bottomRoutes = routes.slice(-2);

  return (
    <div className="drawer relative lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-72 bg-gray-800 text-base-content min-h-[100dvh]">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          >
            <XMarkIcon className="h-5 inline-block w-5" />
          </label>

          <li className="mb-2 font-semibold text-xl">
            <Link to={'/'}>
              <img src={logo} alt="Logo" />
            </Link>
          </li>
          <div className="border-t border-gray-500 mb-2"></div>

          {/* Render regular routes */}
          {regularRoutes.map((route, k) => {
            return (
              <li className="my-1" key={k}>
                <NavLink
                  to={route.path}
                  onClick={closeMenu}
                  className={({ isActive }) => `${isActive ? 'bg-gray-700 font-medium' : 'font-semibold'}`}
                >
                  <span className={location.pathname.includes(route.path) ? 'text-red-600' : 'text-gray-400'}>{route.icon}</span>
                  <span className={location.pathname.includes(route.path) ? 'text-red-600' : 'text-white'}>{route.name}</span>
                  {location.pathname.includes(route.path) && (
                    <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary " aria-hidden="true" />
                  )}
                </NavLink>
              </li>
            );
          })}

          {/* Render bottom routes */}
          <div className=" w-[17rem] absolute bottom-4">
            <div className="border-t border-gray-500 mb-4 "></div>
            {bottomRoutes.map((route, k) => {
              return (
                <li className="my-1" key={k + regularRoutes.length}>
                  <NavLink
                    to={route.path}
                    onClick={closeMenu}
                    className={({ isActive }) => `${isActive ? 'bg-gray-700 font-medium' : 'font-semibold'}`}
                  >
                    <span className={location.pathname.includes(route.path) ? 'text-red-600' : 'text-gray-400'}>
                      {route.icon}
                    </span>
                    <span className={location.pathname.includes(route.path) ? 'text-red-600' : 'text-white'}>{route.name}</span>
                    {location.pathname.includes(route.path) && (
                      <span
                        className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                        aria-hidden="true"
                      />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
