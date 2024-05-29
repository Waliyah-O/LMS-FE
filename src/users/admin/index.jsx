import moment from 'moment';
import { useEffect, useState, useMemo } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import { RECENT_PROGRAMS } from '../../utils/dummyData';
import Pagination from '../../components/pagination/Pagination';
import ProgressBar from '../../components/progressbar/index';
import InfoSection from '../../components/InfoSection';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import Card from '../../components/Cards/DashboardCard';
import readingBoy from '../../assets/svg/reading.svg';
import runningPrograms from '../../assets/svg/Teachers.svg';
import activeCohorts from '../../assets/svg/class-schedule.svg';
import onlineClass from '../../assets/svg/online-class.svg';
import TopSideButtons from '../../components/TopSideButtons';
import RadioFilters from '../../components/RadioFilters';
import CustomTable from '../../components/table';
import Drawer from '../../components/Drawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import { getDecodedAccessToken, _getTokenFromSession } from '../../utils/index';
import DrawerForms from '../../components/Forms/DrawerForm/DrawerForms';
import { setPrimaryContent, setSecondaryContent, setDefaultContent } from '../../components/DrawerSlice';
import { useGetCohortCountQuery } from '../../features/CohortManagement/cohortApi';
import { useGetProgramCountQuery } from '../../features/ProgramManagement/programApi';
import Loader from '../../components/loading/Loader';

const radioOptions = [
  { position: 1, label: 'All' },
  { position: 2, label: 'Completed Courses' },
  { position: 3, label: 'In Progress' },
  { position: 4, label: 'In Review' },
];

const Home = () => {
  const [programs, setPrograms] = useState(RECENT_PROGRAMS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const toggleDrawer = useToggleDrawer();
  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector((state) => state.dateRange);
  const { primaryContent, secondaryContent, defaultContent } = useSelector((state) => state.drawer);

  const decodedToken = getDecodedAccessToken(_getTokenFromSession());

  console.log('admin home page;', decodedToken);

  console.log('admin organization id:', localStorage.getItem('organizationId'));

  const PageSize = 5;

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

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

  const navigate = useNavigate();

  const goToManageCohort = () => {
    navigate('/admin/dashboard/cohort-management');
  };

  const goToManageProgram = () => {
    navigate('/admin/dashboard/program-management');
  };

  const columns = [
    { key: 'Course', title: 'COURSE' },
    { key: 'Status', title: 'STATUS' },
    { key: 'progress', title: 'PROGRESS' },
    { key: 'endDate', title: 'END DATE' },
    { key: 'action', title: 'ACTION' },
  ];

  const drawerContent = (
    <>
      <DrawerForms isSchedulingClass />
    </>
  );

  const firstDrawerContent = (
    <>
      <DrawerForms isCreatingCohort />
    </>
  );

  const secondDrawerContent = (
    <>
      <DrawerForms isCreatingProgram />
    </>
  );

  const handleButtonClick = () => {
    toggleDrawer();
    dispatch(setPrimaryContent(''));
    dispatch(setSecondaryContent(''));
    dispatch(setDefaultContent('default'));
  };

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

  const { data: cohortCount } = useGetCohortCountQuery();
  const noOfCohorts =
    cohortCount && cohortCount.count !== undefined ? (
      cohortCount.count !== 0 ? (
        cohortCount.count
      ) : (
        0
      )
    ) : (
      <Loader fullScreen loaderColor type={'loading-bars'} size={'loading-sm'} />
    );

  const { data: programCount } = useGetProgramCountQuery();
  const noOfPrograms =
    programCount && programCount.count !== undefined ? (
      programCount.count !== 0 ? (
        programCount.count
      ) : (
        0
      )
    ) : (
      <Loader fullScreen loaderColor type={'loading-bars'} size={'loading-sm'} />
    );

  const asideContent = (
    <div className="flex items-center justify-between rounded-md p-6 h-full shadow-basic drop-shadow-md bg-gray-600 md:flex-col gap-2 md:justify-center">
      <div className="flex items-center gap-3 md:gap-4">
        <figure>
          <img className="w-12" src={runningPrograms} />
        </figure>
        <div className="text-white">
          <p className="text-lg-heading font-bold">{noOfPrograms}</p>
          <span className="text-labels">Running Programs</span>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-1 md:flex items-center md:flex-row lg:gap-5">
        <Button onClick={goToManageProgram} variant={ButtonState.outline} size={ButtonSize.s} value={'Manage programs'} />
        <Button onClick={handleSecondCLick} variant={ButtonState.neutral} size={ButtonSize.s} value={'Create Program'} />
      </div>
    </div>
  );

  return (
    <>
      <div className="absolute -top-10 ">
        <Drawer
          defaultContent={defaultContent === 'default' && drawerContent}
          defaultText={'.'}
          primaryContent={primaryContent === 'first' && firstDrawerContent}
          secondaryContent={secondaryContent === 'second' && secondDrawerContent}
          primaryWidth={'w-1/3'}
          secondaryWidth={'w-1/3'}
        />
      </div>
      <InfoSection
        mainCard={
          <Card
            className={'w-14'}
            bgColor={'bg-red-600'}
            srcImg={activeCohorts}
            mainText={noOfCohorts}
            cardText={'Active Cohorts'}
            mainTextSize={'text-lg-heading'}
            mainTextColor={'text-white'}
            cardTextColor={'text-white'}
            multiButton
            textOne={'Manage Cohorts'}
            textTwo={'Create Cohort'}
            onClick={goToManageCohort}
            onClickTwo={handleFirstCLick}
          />
        }
        subCardOne={
          <Card
            bgColor={'bg-white'}
            mainText={'678,978'}
            srcImg={readingBoy}
            mainTextSize={'text-xxl'}
            cardText={'Registered Students'}
            buttonText={'View Students'}
            // onClick={''}
          />
        }
        subCardTwo={
          <Card
            bgColor={'bg-white'}
            srcImg={onlineClass}
            mainText={'459'}
            mainTextSize={'text-xxl'}
            cardText={'Current Tutors'}
            buttonText={'View Tutors'}
            // onClick={''}
          />
        }
        asideContent={asideContent}
      >
        <div className="p-4">
          <TitleCard
            title={`Featured Organization Courses`}
            topMargin="mt-2"
            hasDivider
            className={'p-4'}
            topSideButtons={
              <TopSideButtons icon={<FaPlus />} buttonText={'Schedule a Class'} colored onClick={handleButtonClick} />
            }
            hasRadioButton={<RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} />}
          >
            {/* Team Member list in table format loaded constant */}
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
      </InfoSection>
    </>
  );
};

export default Home;
