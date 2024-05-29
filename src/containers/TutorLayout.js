import LeftSidebar from './LeftSidebar';
import { useSelector, useDispatch } from 'react-redux';
import RightSidebar from './RightSidebar';
import { useEffect, Suspense } from 'react';
import { removeNotificationMessage } from '../features/common/headerSlice';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ModalLayout from './ModalLayout';
import routes from '../AllRoutes/tutor/tutorSIdebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import SuspenseContent from './SuspenseContent';

function TutorLayout() {
  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector((state) => state.header);

  useEffect(() => {
    if (newNotificationMessage !== '') {
      if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, 'Success');
      if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, 'Error');
      dispatch(removeNotificationMessage());
    }
  }, [newNotificationMessage]);

  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer drawer-mobile">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <Header />
          <main>
            <Suspense fallback={<SuspenseContent />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
        <LeftSidebar routes={routes} />
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />
    </>
  );
}

export default TutorLayout;
