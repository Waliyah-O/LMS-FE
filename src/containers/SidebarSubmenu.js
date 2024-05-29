import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SidebarSubmenu({ submenu, name, icon }) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  /** Open Submenu list if path found in routes, this is for directly loading submenu routes  first time */
  useEffect(() => {
    if (
      submenu.filter((m) => {
        return m.path === location.pathname;
      })[0]
    )
      setIsExpanded(true);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex-col relative text-white">
      {/** Route header */}
      <div className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
        {!isExpanded ? <span className="text-gray-400">{icon}</span> : null}{' '}
        {!isExpanded ? <span className="text-white">{name}</span> : ''}
        <ChevronDownIcon
          className={
            'absolute w-5 h-5 mt-1 delay-400 duration-500 transition-all right-4 top-1/2 -translate-y-1/2 ' +
            (isExpanded ? 'rotate-180 left-4' : '')
          }
        />
      </div>

      {/** Submenu list */}
      <div className={` w-full ` + (isExpanded ? '' : 'hidden')}>
        <ul className={`menu `}>
          {submenu.map((m, k) => {
            return (
              <li key={k}>
                <NavLink to={m.path} className={({ isActive }) => `${isActive ? 'bg-gray-600 font-medium' : 'font-semibold'}`}>
                  <span className={location.pathname === m.path ? 'text-red-500' : 'text-gray-400'}>{m.icon}</span>
                  <span className={location.pathname === m.path ? 'text-red-500' : 'text-white'}>{m.name}</span>
                  {location.pathname === m.path ? (
                    <span
                      className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SidebarSubmenu;
