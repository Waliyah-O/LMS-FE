import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RECENT_PROGRAMS, USER_INFO } from '../../utils/dummyData';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ProfileCard from '../../components/Cards/ProfileCard';
import TitleCard from '../../components/Cards/TitleCard';
import { capitalize } from '../../utils';
import TopSideButtons from '../../components/TopSideButtons';
import RadioFilters from '../../components/RadioFilters';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import CustomTable from '../../components/table';
import Pagination from '../../components/pagination/Pagination';
import { IoWarning } from 'react-icons/io5';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import Drawer from '../../components/Drawer';
import { setPrimaryContent, setSecondaryContent, setDefaultContent } from '../../components/DrawerSlice';
import sample from '../../assets/Theo.pdf';
import DrawerForms from '../../components/Forms/DrawerForm/DrawerForms';
import { activateStudentProfile, activateTutorProfile, handleActivateAccount } from '../../components/Forms/DrawerForm/Functions';

const Profile = () => {
  const [programs, setPrograms] = useState(RECENT_PROGRAMS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector((state) => state.dateRange);

  const { primaryContent, secondaryContent, defaultContent } = useSelector((state) => state.drawer);

  const toggleDrawer = useToggleDrawer();

  const goBack = () => {
    navigate(-1);
  };

  const selectedUser = USER_INFO.find((user) => user.id === id);

  if (!selectedUser) {
    return <div>User not found!</div>;
  }

  const formattedGender = capitalize(selectedUser.gender);

  const profileInfoArray = [
    [
      { label: 'Gender', value: formattedGender },
      { label: 'Current Cohort', value: selectedUser.cohort },
      { label: 'Date of birth', value: selectedUser.dateOfBirth },
      { label: 'Email', value: selectedUser.email },
    ],
    [
      { label: 'Phone number', value: selectedUser.phoneNumber },
      { label: 'Country of residence', value: selectedUser.countryOfResidence },
      { label: 'State of residence', value: selectedUser.stateOfResidence },
      selectedUser.userType === 'Tutor' && { label: 'Level of Experience', value: selectedUser.levelOfExperience },
    ],
    [{ label: 'Identification Card', value: <img src={selectedUser.avatar} alt="Avatar" className="mt-1 w-80 h-36" /> }],
  ];

  const nextOfKinArray = [
    [
      { label: 'Name', value: selectedUser.user },
      { label: 'Residential address', value: selectedUser.countryOfResidence },
    ],
    [
      { label: 'Email address', value: selectedUser.email },
      { label: 'Phone number', value: selectedUser.phoneNumber },
    ],
  ];

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Completed Courses' },
    { position: 3, label: 'In Progress' },
    { position: 4, label: 'In Review' },
  ];

  const PageSize = 5;

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

  const columns = [
    { key: 'Course', title: 'COURSE' },
    { key: 'Status', title: 'STATUS' },
    { key: 'progress', title: 'PROGRESS' },
    { key: 'endDate', title: 'END DATE' },
    { key: 'action', title: 'ACTION' },
  ];

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let filteredPrograms;

    filteredPrograms =
      filterStatus === 'Completed Courses'
        ? programs.filter((program) => program.Status === 'Completed')
        : filterStatus === 'All'
        ? programs
        : programs.filter((program) => program.Status === filterStatus);

    // filter by date range
    if (dayjs(startDate).isToday() && dayjs(endDate).isToday()) {
      filteredPrograms = filteredPrograms.slice(firstPageIndex, lastPageIndex);
    } else {
      filteredPrograms = filteredPrograms
        .filter(
          (program) =>
            program.DUE_DATE.isSameOrAfter(dayjs(startDate).startOf('day')) &&
            program.DUE_DATE.isSameOrBefore(dayjs(endDate).endOf('day'))
        )
        .slice(firstPageIndex, lastPageIndex);
    }

    return filteredPrograms;
  }, [currentPage, programs, filterStatus, startDate, endDate]);

  // const handleOpenModal = () => {
  //   dispatch(
  //     openModal({
  //       title: 'View Tutor Resume',
  //       bodyType: MODAL_BODY_TYPES.RESUME_VIEW,
  //     })
  //   );
  // };

  const firstDrawerContent = (
    <>
      <h1 className="font-bold">Tutor's Resume</h1>
      <iframe src={sample} width={'100%'} height={'700px'} />
    </>
  );

  const secondDrawerContent = (
    <>
      <DrawerForms isDisablingAccount />
    </>
  );

  const disabledProfileDrawer = (
    <>
      <DrawerForms isActivatingAccount />
    </>
  );

  const handleFirstCLick = () => {
    toggleDrawer();
    dispatch(setPrimaryContent('first'));
    dispatch(setSecondaryContent(''));
    dispatch(setDefaultContent(''));
  };

  const handleSecondCLick = () => {
    toggleDrawer();
    dispatch(setSecondaryContent('second'));
    dispatch(setPrimaryContent(''));
    dispatch(setDefaultContent(''));
  };

  const handleButtonClick = () => {
    toggleDrawer();
    dispatch(setDefaultContent('default'));
    dispatch(setPrimaryContent(''));
    dispatch(setSecondaryContent(''));
  };

  return (
    <>
      <div className="p-4 bg-gray-50 ">
        <div className="absolute -top-10 ">
          <Drawer
            defaultContent={defaultContent === 'default' && disabledProfileDrawer}
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
            <h1 className="text-xl font-bold">User Profile</h1>
          </div>
        </div>

        {selectedUser.Status !== 'Active' && (
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
                onClick={selectedUser.userType === 'Student' ? activateStudentProfile : activateTutorProfile}
              />
            </p>
          </div>
        )}

        <ProfileCard
          imgSrc={selectedUser.avatar}
          nameText={selectedUser.user}
          userType={selectedUser.userType}
          title={selectedUser.program}
          role={selectedUser.cohort}
          Status={selectedUser.Status}
          onClick={handleFirstCLick}
          onClickTwo={handleSecondCLick}
          onButtonClick={handleButtonClick}
          buttonTextOne={`View Tutor's CV`}
          buttonTextTwo={'Disable Account'}
          disabledText={'View Comments'}
        />

        <TitleCard hasDivider title={'Basic Information'} className={'p-4'}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {profileInfoArray.map((sectionContent, index) => (
              <section key={index} className="md:col-span-1">
                {sectionContent.map((item, idx) => (
                  <div key={idx}>
                    {item && (
                      <div className="flex flex-col justify-center">
                        <label className="text-small text-gray-900 mt-3">{item.label}:</label>
                        <p className="text-lg text-gray-500 font-semibold">{item.value}</p>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </TitleCard>

        {selectedUser.userType === 'Student' && (
          <TitleCard hasDivider title={'Next of kin'} className={'p-4'}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {nextOfKinArray.map((sectionContent, index) => (
                <section key={index} className="col-span-1">
                  {sectionContent.map((item, idx) => (
                    <div key={idx}>
                      {item && (
                        <div className="flex flex-col justify-center">
                          <label className="text-small text-gray-900 mt-3">{item.label}:</label>
                          <p className="text-lg text-gray-500 font-semibold">{item.value}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </TitleCard>
        )}

        <TitleCard
          title={'Course Activities'}
          hasDivider
          className={'p-4'}
          topSideButtons={<TopSideButtons />}
          hasRadioButton={<RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} />}
        >
          <div className="overflow-x-auto w-full">
            <CustomTable columns={columns} data={currentTableData} />
          </div>

          <div className="">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={RECENT_PROGRAMS.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </TitleCard>
      </div>
    </>
  );
};

export default Profile;
