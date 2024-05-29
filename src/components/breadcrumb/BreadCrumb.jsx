import { Link, useLocation } from 'react-router-dom';

const formatPathname = (pathname) => {
  const words = pathname.split('-');
  const capitalizedPath = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedPath.join(' ');
};

const BreadCrumb = ({ initialPathName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const initialPath = pathnames.includes('admin')
    ? '/admin/dashboard/home'
    : pathnames.includes('super-admin')
    ? '/super-admin/dashboard/home'
    : undefined;

  const finalPath = formatPathname(pathnames[pathnames.length - 1]);

  return (
    <>
      <div className="text-small breadcrumbs">
        <ul>
          <li>
            <Link to={initialPath}>Home</Link>
          </li>
          <li className="text-zinc-400">{finalPath}</li>
        </ul>
      </div>
    </>
  );
};

export default BreadCrumb;
