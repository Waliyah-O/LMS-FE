import { useState, useMemo } from 'react';
import TitleCard from '../../../components/Cards/TitleCard';
import { RECENT_PROGRAMS } from '../../../utils/dummyData';
import Pagination from '../../../components/pagination/Pagination';
import InfoSection from '../../../components/InfoSection';
import flutterWaveLogo from '../../../assets/images/flutterwave.png';
import apLogo from '../../../assets/images/africa-prudential.png';
import accessLogo from '../../../assets/images/access-bank.png';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import { ButtonSize, ButtonState } from '../../../components/button/enum';
import { useNavigate } from 'react-router-dom';
import buildingImg from '../../../assets/svg/Building.svg';
import activeCohorts from '../../../assets/svg/class-schedule(colored).svg';
import runningPrograms from '../../../assets/svg/Teachers(colored).svg';
import Card from '../../../components/Cards/DashboardCard';
import TopSideButtons from '../../../components/TopSideButtons';
import RadioFilters from '../../../components/RadioFilters';
import CustomTable from '../../../components/table';
import { useGetOrganizationCountQuery, useGetOrganizationsQuery } from '../../../features/AdminManagement/AdminApi';
import { useGetCohortCountQuery, useGetCohortsQuery } from '../../../features/CohortManagement/cohortApi';
import { useGetProgramCountQuery, useGetProgramsQuery } from '../../../features/ProgramManagement/programApi';
import Loader from '../../../components/loading/Loader';
import { _getTokenFromSession, getDecodedAccessToken } from '../../../utils';
import { BsClipboard2X } from 'react-icons/bs';
import FloatingCube from '../../../components/loading/FloatingCube';

// const radioOptions = [
//   { position: 1, label: 'All' },
//   { position: 2, label: 'Completed Courses' },
//   { position: 3, label: 'In Progress' },
//   { position: 4, label: 'In Review' },
// ];

function Home() {
  const [programs, setPrograms] = useState(RECENT_PROGRAMS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const PageSize = 5;

  /************ API CALLS **********/

  const { data: admins, error, isLoading, isFetching } = useGetOrganizationsQuery();
  console.log(admins);

  const { data: adminCount } = useGetOrganizationCountQuery();
  const noOfAdmins =
    adminCount && adminCount.count !== undefined ? (
      adminCount.count !== 0 ? (
        adminCount.count
      ) : (
        0
      )
    ) : (
      <Loader fullScreen loaderColor type={'loading-bars'} size={'loading-sm'} />
    );

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

  /************ SORTING **********/

  // const sortByNewest = (a, b) => {
  //   if (a.createdAt < b.createdAt) {
  //     return 1;
  //   }
  //   if (a.createdAt > b.createdAt) {
  //     return -1;
  //   }
  //   return 0;
  // };

  // const sortedAdmins = admins ? admins.slice().sort(sortByNewest) : [];

  // const lastThreeAdded = sortedAdmins.slice(0, 3);

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Active' },
    { position: 3, label: 'Inactive' },
    { position: 4, label: 'Disabled' },
  ];

  const columns = [
    { key: 'organizationName', title: 'ORGANIZATIONS' },
    { key: 'adminFullName', title: 'admin name' },
    { key: 'organizationStatus', title: 'STATUS' },
    { key: 'endDate', title: 'DUE DATE' },
    { key: 'progress', title: 'PROGRESS' },
  ];
  // const columns = [
  //   { key: 'Organization', title: 'ORGANIZATIONS' },
  //   { key: 'Course', title: 'COURSES' },
  //   { key: 'Status', title: 'STATUS' },
  //   { key: 'endDate', title: 'DUE DATE' },
  //   { key: 'progress', title: 'PROGRESS' },
  // ];

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // const adminsData = admins && admins.data ? admins.data : [];
  const adminsData = admins && admins.data ? [...admins.data] : [];
  const reversedData = adminsData.reverse();
  console.log(reversedData);

  const lastThreeOrganizations = adminsData.slice(0, 3);
  // const lastThreeOrganizations = adminsData.slice(-3)

  const filteredAdmins = useMemo(() => {
    switch (filterStatus) {
      case 'All':
        return adminsData;
      case 'Active':
        return adminsData.filter((admin) => admin.organizationStatus === 'Active');
      case 'Disabled':
        return adminsData.filter((admin) => admin.organizationStatus === 'Disabled');
      case 'Inactive':
        return adminsData.filter((admin) => admin.organizationStatus === 'Inactive');
      default:
        return adminsData;
    }
  }, [admins, filterStatus]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    let filteredData = Array.isArray(filteredAdmins)
      ? filteredAdmins.slice(firstPageIndex, lastPageIndex).map((admin) => ({ ...admin }))
      : [];

    if (searchTerm) {
      filteredData = filteredData.filter((admin) =>
        Object.values(admin).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filteredData;
  }, [currentPage, filteredAdmins, PageSize, searchTerm]);

  // const displayedData = adminsData.reverse()
  // console.log(displayedData);

  // const filteredPrograms =
  // filterStatus === 'Completed Courses'
  //   ? programs.filter((program) => program.Status === 'Completed')
  //   : filterStatus === 'All'
  //   ? programs
  //   : programs.filter((program) => program.Status === filterStatus);

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;

  //       let filteredData = Array.isArray(filteredPrograms)? filteredPrograms.slice(firstPageIndex, lastPageIndex).map((program) => ({...program})) : []

  //       if(searchTerm){
  //         filteredData = filteredData.filter((program) => Object.values(program).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())))
  //       }

  //       return filteredData

  // }, [currentPage, programs, filterStatus, searchTerm]);

  /************ NAVIGATION **********/

  const user = getDecodedAccessToken(_getTokenFromSession());

  const adminIdRoute = user.role === 'SuperAdmin' ? 'super-admin' : 'admin';

  const goToPreSignup = () => {
    navigate(`/super-admin/dashboard/create-account`);
  };

  const goToAdmin = (organizationId) => {
    navigate(`/${adminIdRoute}/dashboard/admin-management/${organizationId}`);
  };

  const goToOrgs = () => {
    navigate('/super-admin/dashboard/admin-management');
  };

  const goToNewAccount = () => {
    navigate('/super-admin/dashboard/create-account');
  };

  const goToCohorts = () => {
    navigate('/super-admin/dashboard/cohort-management');
  };

  const goToPrograms = () => {
    navigate('/super-admin/dashboard/program-management');
  };

  /************ CONTENT **********/


  /************ CONDITIONALS ***********/

  if (isLoading || isFetching) {
    return <Loader type={'loading-bars'} size={'loading-lg'} />;
  }

  if (error || !admins || !admins.data) {
    return (
      <div className="w-full items-center justify-center text-headline flex flex-col">
        {error}
        {console.log(error)}
      </div>
    );
  }

  const asideContent = (
  <div className="rounded-md p-6 h-full shadow-basic drop-shadow-sm bg-white md:grid place-content-center gap-2">
    <h1 className="-mt-2 text-gray-500 font-semibold">Recently Joined Organizations</h1>
    {lastThreeOrganizations.length > 0 ? (
      <ul className="list-none flex flex-col h-full gap-2 md:items-start justify-evenly">
        {lastThreeOrganizations.reverse().map((organization, index) => (
          <li className="flex items-center gap-2" key={index}>
            <img src={organization.logoURL} alt={organization.name} className='w-8 rounded-full' />
            <div className="flex flex-col">
              <h2 className="text-gray-800 font-semibold">{organization.organizationName}</h2>
              <Link className="text-red-500 underline text-xs -mt-1" to={`/${adminIdRoute}/dashboard/admin-management/${organization.organizationId}`}>View Details</Link>
            </div>
          </li>
        ))}
        <Button variant={ButtonState.DarkOutline} size={ButtonSize.sm} value="View Organizations" onClick={goToOrgs} />
      </ul>
    ) : <p>nothing to see here</p>}
  </div>
);

  return (
    <>
    
      <InfoSection
        mainCard={
          <Card
            bgColor={'bg-red-600'}
            srcImg={buildingImg}
            mainText={noOfAdmins}
            mainTextSize={'text-lg-heading'}
            mainTextColor={'text-white'}
            cardText={'Registered Organizations'}
            cardTextColor={'text-white'}
            multiButton
            textOne={'Manage Organizations'}
            textTwo={'Create new Account'}
            onClick={goToOrgs}
            onClickTwo={goToNewAccount}
          />
        }
        subCardOne={
          <Card
            bgColor={'bg-white'}
            srcImg={activeCohorts}
            mainText={noOfCohorts}
            mainTextSize={'text-xxl'}
            cardText={'Active Cohorts'}
            buttonText={'View Cohorts'}
            onClick={goToCohorts}
          />
        }
        subCardTwo={
          <Card
            bgColor={'bg-white'}
            srcImg={runningPrograms}
            mainText={noOfPrograms}
            mainTextSize={'text-xxl'}
            cardText={'Running Programs'}
            buttonText={'View Programs'}
            onClick={goToPrograms}
          />
        }
        asideContent={asideContent}
      >
        <div className="p-4 bg-gray-50">
        <div>
          {filteredAdmins ? (
            <>
              <TitleCard
                topMargin={'mt-2'}
                hasDivider
                title={'Organization Admin Management'}
                topSideButtons={
                  <TopSideButtons colored buttonText={'Add an admin'} onClick={goToPreSignup} onSearch={handleSearch} onChange={handleSearch} />
                }
                hasRadioButton={<RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} count={filteredAdmins.length} />}
              >
                <div>
                  
                  {filteredAdmins.length > 0 ? (
                    <CustomTable columns={columns} data={currentTableData} onRowClick={goToAdmin} id="organizationId" />
                  ) : (
                    <div className="text-center p-4">
                      {filterStatus === 'Active' && <p>There are currently no active admins.</p>}
                      {filterStatus === 'Disabled' && <p>There are currently no disabled admins.</p>}
                      {filterStatus === 'Inactive' && <p>There are currently no inactive admins.</p>}
                    </div>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalCount={filteredAdmins?.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </TitleCard>
            </>
          ) : (
            <TitleCard
              topMargin={'mt-2'}
              hasDivider
              title={'Organization Admin Management'}
              // topSideButtons={<TopSideButtons colored buttonText={'Add an admin'} onClick={goToPreSignup} />}
            >
              <div className=" flex flex-col items-center gap-4 justify-center p-4">
                <BsClipboard2X className="w-10 h-10 text-red-650" />
                <h2 className="text-headline">Nothing to see here</h2>
                <p className=" flex text-center items-center justify-center  font-semibold">
                  Click the button below to initiate the creation of an <br /> admin as none has been established yet.
                </p>
                <Button value="Add Admin" variant={ButtonState.SECONDARY} size={ButtonSize.s} onClick={goToPreSignup} />
              </div>
            </TitleCard>
          )}
        </div>
      </div>
      </InfoSection>
    </>
  );
}

export default Home;
