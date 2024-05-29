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
import { Route } from 'react-router-dom';
import LogoutButton from '../../features/LogoutButton';
import { _getTokenFromSession, getDecodedAccessToken } from '../../utils';

const iconClasses = `h-5 w-5`;

const token = _getTokenFromSession();
const decodedToken = token ? getDecodedAccessToken(token) : null;

const superAdminRoutes = decodedToken
  ? [
      {
        path: `/super-admin/dashboard/home`,
        icon: <RiDashboardFill className={iconClasses} />,
        name: 'Home',
      },
      {
        path: `/super-admin/dashboard/admin-management`,
        icon: <BiUser className={iconClasses} />,
        name: 'Organization Management',
      },
      {
        path: `/super-admin/dashboard/assessment-management`,
        icon: <MdOutlineCreateNewFolder className={iconClasses} />,
        name: 'Assessment Management',
      },
      {
        path: `/super-admin/dashboard/cohort-management`,
        icon: <FaGraduationCap className={iconClasses} />,
        name: 'Cohort Management',
        nestedRoutes: [
          {
            path: ':id',
          },
        ],
      },
      {
        path: `/super-admin/dashboard/program-management`,
        icon: <LiaChalkboardTeacherSolid className={iconClasses} />,
        name: 'Program Management',
        nestedRoutes: [
          {
            path: ':id',
          },
        ],
      },
      {
        path: `/super-admin/dashboard/course-management`,
        icon: <CgFileDocument className={iconClasses} />,
        name: 'Course Management',
      },
      {
        path: `/super-admin/dashboard/live-classes`,
        icon: <MdLiveTv className={iconClasses} />,
        name: 'Live Classes Management',
      },
      {
        path: `/super-admin/dashboard/verification-management`,
        icon: <GoVerified className={iconClasses} />,
        name: 'Verification Management',
      },
      {
        path: `/super-admin/dashboard/admission-management`,
        icon: <HiOutlineClipboardDocumentCheck className={iconClasses} />,
        name: 'Admission Management',
      },
      {
        path: `/super-admin/dashboard/roles-and-permissions`,
        icon: <LuSettings2 className={iconClasses} />,
        name: 'Roles & Permissions',
      },
      {
        path: `/super-admin/dashboard/settings-profile`,
        icon: <Cog6ToothIcon className={iconClasses} />,
        name: 'Account Settings',
      },
      {
        path: '/signin',
        icon: <ImExit className={iconClasses} />,
        name: 'Log Out',
        onclick: () => {
          // console.log('log out');
          <LogoutButton />;
        },
      },
    ]
  : [];

export default superAdminRoutes;
