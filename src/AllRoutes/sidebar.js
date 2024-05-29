// /** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon';
import WalletIcon from '@heroicons/react/24/outline/WalletIcon';
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import BoltIcon from '@heroicons/react/24/outline/BoltIcon';
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import FolderPlusIcon from '@heroicons/react/24/outline/FolderPlusIcon';
import classIcon from '../assets/svg/class-schedule.svg';

const iconClasses = `h-5 w-5`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: '/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Home',
  },
  
  {
    path: '/dashboard/admin-management', // url
    icon: <UserIcon className={iconClasses} />, // icon component
    name: 'Admin Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/assessment-management', // url
    icon: <FolderPlusIcon className={iconClasses} />, // icon component
    name: 'Assessment Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/cohort-management', // url
    icon: <img src={classIcon} className={iconClasses} />, // icon component
    name: 'Cohort Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/program-management', // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: 'Program Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/course-management', // url
    icon: <BoltIcon className={iconClasses} />, // icon component
    name: 'Course Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/live-classes', // url
    icon: <BoltIcon className={iconClasses} />, // icon component
    name: 'Live Classes Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/verification-management', // url
    icon: <BoltIcon className={iconClasses} />, // icon component
    name: 'Verification Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/admission-management', // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: 'Admission Management', // name that appear in Sidebar
  },
  {
    path: '/dashboard/roles-and-permissions', // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: 'Roles & Permissions', // name that appear in Sidebar
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu: [
      {
        path: '/dashboard/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      {
        path: '/dashboard/settings-billing',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'Billing',
      },
      {
        path: '/dashboard/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses} />, // icon component
        name: 'Team Members', // name that appear in Sidebar
      },
    ],
  },
];

export default routes;