/** Icons are imported separatly to reduce build time */
import { RiDashboardFill } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa6';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { CgFileDocument } from 'react-icons/cg';
import { MdLiveTv } from 'react-icons/md';
import { GoVerified } from 'react-icons/go';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { LuSettings2 } from 'react-icons/lu';
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import { ImExit } from 'react-icons/im';
import Profile from '../../users/admin/Profile';

const iconClasses = `h-5 w-5`;

const AdminRoutes = [
  {
    path: '/admin/dashboard/home',
    icon: <RiDashboardFill className={iconClasses} />,
    name: 'Home',
  },

  {
    path: '/admin/dashboard/user-administration',
    icon: <BiUser className={iconClasses} />,
    name: 'User Administration',
    nestedRoutes: [
      {
        path: ':id',
      },
    ],
  },

  {
    path: '/admin/dashboard/cohort-management',
    icon: <FaGraduationCap className={iconClasses} />,
    name: 'Cohort Management',
    nestedRoutes: [
      {
        path: ':id',
      },
    ],
  },

  {
    path: '/admin/dashboard/program-management',
    icon: <LiaChalkboardTeacherSolid className={iconClasses} />,
    name: 'Program Management',
  },

  {
    path: '/admin/dashboard/course-management',
    icon: <CgFileDocument className={iconClasses} />,
    name: 'Course Management',
    nestedRoutes: [
      {
        path: ':id',
      },
    ],
  },

  {
    path: '/admin/dashboard/live-classes-management',
    icon: <MdLiveTv className={iconClasses} />,
    name: 'Live Classes Management',
  },

  {
    path: '/admin/dashboard/settings-profile',
    icon: <Cog6ToothIcon className={iconClasses} />,
    name: 'Account Settings',
  },

  {
    path: '/signin',
    icon: <ImExit className={iconClasses} />,
    name: 'Log Out',
  },
];

export default AdminRoutes;
