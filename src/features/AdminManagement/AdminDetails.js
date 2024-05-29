import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrganizationsQuery, useGetOrganizationQuery } from './AdminApi';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Drawer from '../../components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setPrimaryContent, setSecondaryContent } from '../../components/DrawerSlice';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import sample from '../../assets/Theo.pdf';
import TextArea from '../../components/customInputs/TextArea';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import { IoWarning } from 'react-icons/io5';
import { dummyProgramData } from '../../data/dummyData';
import ProfileCard from '../../components/Cards/ProfileCard'
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import TitleCard from '../../components/Cards/TitleCard';
import Loader from '../../components/loading/Loader';

const AdminDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = useToggleDrawer();

  const { primaryContent, secondaryContent } = useSelector((state) => state.drawer);

  const { data: admins, error, isLoading, isFetching } = useGetOrganizationsQuery();

  const adminDetail = admins && admins.data ? admins.data : []

  const goBack = () => {
    navigate(-1);
  };

  // Check if admin exists and is an array before finding the selected admin
  // const selectedAdmin = dummyProgramData.find((user) => user.id === id);

  const selectedAdmin = adminDetail.find((admin) => admin.organizationId === id);

  console.log(selectedAdmin);

  if (isLoading || isFetching) {
    return <Loader type={'loading-bars'} size={'loading-lg'} />;
  }

  if (!selectedAdmin) {
    return (
      <div className="w-full h-screen border border-red-600 flex flex-col items-center justify-center">
        <MdOutlineAdminPanelSettings className="w-40 h-40 text-red-650" />
        <p>Details not available</p>
        <Button value="Go Back" variant={ButtonState.ALT_DARK} size={ButtonSize.md} onClick={goBack} />
      </div>
    );
  }

  const firstDrawerContent = (
    <>
      <h1 className="font-bold">Tutor's Resume</h1>
      <iframe src={sample} width={'100%'} height={'700px'} />
    </>
  );

  const secondDrawerContent = (
    <>
      <h1 className="font-bold text-gray-500">Disable Account</h1>
      <TextArea />
    </>
  );

  const handleFirstCLick = () => {
    toggleDrawer();
    dispatch(setPrimaryContent('first'));
    dispatch(setSecondaryContent(''));
  };

  const handleSecondCLick = () => {
    toggleDrawer();
    dispatch(setSecondaryContent('second'));
    dispatch(setPrimaryContent(''));
  };

  return (
    <div className="p-4 bg-gray-50">
      <div className="absolute -top-10 ">
        <Drawer
          primaryContent={primaryContent === 'first' && firstDrawerContent}
          secondaryContent={secondaryContent === 'second' && secondDrawerContent}
          defaultText={'.'}
          primaryWidth={'w-3/5'}
          secondaryWidth={'w-1/3'}
        />
      </div>
      <div className="pb-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="btn btn-xs btn-outline text-blue-500 no-animation">
            <FaArrowLeftLong /> Back
          </button>
          <h1 className="text-xl font-bold">Admin Profile</h1>
        </div>
      </div>

      {selectedAdmin.organizationStatus !== 'Active' && (
        <div className="bg-[#FDF6B2] p-4 my-4 rounded-lg">
          <p className="flex flex-col sm:flex-row items-center gap-2.5 text-yellow-800">
            <IoWarning className="h-6 w-6" />
            <span className="font-bold">Notice:</span>
            <span className="text-sm font-semibold">
              This user's account has been temporarily disabled. You have 29 days to reactivate it or risk losing all its data.
            </span>
            <Button
              className={'mt-4 sm:mt-0 ml-0 sm:ml-10'}
              value="Activate Account"
              size={ButtonSize.xs}
              variant={ButtonState.ALT_SUCCESS}
            />
          </p>
        </div>
      )}

      <ProfileCard
        imgSrc={selectedAdmin.logoURL}
        nameText={selectedAdmin.organizationName}
        userType={selectedAdmin.organizationId}
        title={selectedAdmin.displayName}
        role={selectedAdmin.cohort}
        Status={selectedAdmin.organizationStatus}
        onClick={handleFirstCLick}
        onClickTwo={handleSecondCLick}
        buttonTextOne={`Edit Admin`}
        buttonTextTwo={'Delete Admin'}
      />

      <TitleCard title={'Basic Information'} className={'p-4'}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"></div>
      </TitleCard>

      {selectedAdmin.userType === 'Student' && (
        <TitleCard title={'Next of kin'} className={'p-4'}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"></div>
        </TitleCard>
      )}
    </div>
  );
};

export default AdminDetails;
