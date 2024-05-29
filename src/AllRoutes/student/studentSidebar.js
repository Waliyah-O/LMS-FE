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

const iconClasses = `h-5 w-5`;

const StudentRoutes = [
  {
    path: '/student/dashboard/home',
    icon: <RiDashboardFill className={iconClasses} />,
    name: 'Home',
  },
  {
    path: '/student/dashboard/admin-management',
    icon: <BiUser className={iconClasses} />,
    name: 'Admin Management',
  },
  {
    path: '/student/dashboard/assessment-management',
    icon: <MdOutlineCreateNewFolder className={iconClasses} />,
    name: 'Assessment Management',
  },
  {
    path: '/student/dashboard/cohort-management',
    icon: <FaGraduationCap className={iconClasses} />,
    name: 'Cohort Management',
  },
  {
    path: '/student/dashboard/program-management',
    icon: <LiaChalkboardTeacherSolid className={iconClasses} />,
    name: 'Program Management',
  },
  {
    path: '/student/dashboard/course-management',
    icon: <CgFileDocument className={iconClasses} />,
    name: 'Course Management',
  },
  {
    path: '/student/dashboard/live-classes',
    icon: <MdLiveTv className={iconClasses} />,
    name: 'Live Classes Management',
  },
  {
    path: '/student/dashboard/verification-management',
    icon: <GoVerified className={iconClasses} />,
    name: 'Verification Management',
  },
  {
    path: '/student/dashboard/admission-management',
    icon: <HiOutlineClipboardDocumentCheck className={iconClasses} />,
    name: 'Admission Management',
  },
  {
    path: '/student/dashboard/roles-and-permissions',
    icon: <LuSettings2 className={iconClasses} />,
    name: 'Roles & Permissions',
  },
  {
    path: '/student/dashboard/settings-profile',
    icon: <Cog6ToothIcon className={iconClasses} />,
    name: 'Account Settings',
  },
  {
    path: '.',
    icon: <ImExit className={iconClasses} />,
    name: 'Log Out',
  },
];

export default StudentRoutes;
