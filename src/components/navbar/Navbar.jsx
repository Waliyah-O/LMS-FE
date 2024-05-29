/* eslint-disable no-unused-vars */
import logo from '../../assets/svg/academy-logo-red-icon.svg';
import { NavLink, Link } from 'react-router-dom';
import MobileMenu from '../mobileMenu';

const Navbar = () => {
  const menuItems = [
    { label: 'For Candidates', to: '/super-admin/dashboard' },
    { label: 'For Organizations', to: '/' },
    { label: 'Why i-Academy', to: '/why' },
    { label: 'Organization Benefits', to: '/benefits' },
    { label: 'FAQs', to: '/faq' },
    { label: 'Contact us', to: '/contact' },
  ];

  return (
    <div>
      <nav className="bg-black text-white flex gap-12 h-16 items-center pt-9 p-4 md:pl-16">
        <div className="flex justify-between items-center w-full lg:w-auto ">
          <div>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="lg:hidden">
            <MobileMenu menuItems={menuItems} />
          </div>
        </div>

        <div className="hidden lg:flex gap-10 font-medium">
          <NavLink
            className={({ isActive }) => [
              isActive
                ? 'py-2 border-b-2 border-red-500 text-red-500'
                : 'py-2 border-transparent border-b-2 hover:border-red-500',
            ]}
            to="/super-admin/dashboard/home"
          >
            For Candidates
          </NavLink>

          <NavLink
            // className={({ isActive }) => [
            //   isActive
            //     ? ' py-2 border-b-2 border-red-500 text-red-500'
            //     : 'py-2 border-transparent border-b-2 hover:border-red-500',
            // ]}
            className="py-2 border-b-2 border-red-500 text-red-500"
            to="/"
          >
            For Organizations
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
