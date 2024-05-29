import React, { useEffect, useState, useMemo } from 'react';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import TitleCard from '../../components/Cards/TitleCard';
import TopSideButtons from '../../components/TopSideButtons';
import RadioFilters from '../../components/RadioFilters';
import { useGetCohortsQuery } from './cohortApi';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../common/modalSlice';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import Loader from '../../components/loading/Loader';
import { useNavigate, Link } from 'react-router-dom';
import CustomTable from '../../components/table';
import Pagination from '../../components/pagination/Pagination';
import DrawerForms from '../../components/Forms/DrawerForm/DrawerForms';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import { setPrimaryContent, setSecondaryContent } from '../../components/DrawerSlice';
import Drawer from '../../components/Drawer';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import { BsClipboard2X } from 'react-icons/bs';

const Cohort = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDrawer = useToggleDrawer();
  const { primaryContent, secondaryContent } = useSelector((state) => state.drawer);
  const { data: cohorts, error, isLoading, isFetching } = useGetCohortsQuery();

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Completed' },
    { position: 3, label: 'In Review' },
    { position: 4, label: 'In Progress' },
  ];

  const columns = [
    { key: 'cohortName', title: 'Cohort Name' },
    { key: 'status', title: 'status' },
    { key: 'progress', title: 'progress' },
    { key: 'endDate', title: 'end date' },
  ];

  const openNewCohortModal = () => {
    dispatch(
      openModal({
        title: 'Add New Cohort',
        bodyType: MODAL_BODY_TYPES.COHORT_ADD_NEW,
      })
    );
  };

  
  const drawerContent = (
    <>
      <DrawerForms isCreatingCohort />
    </>
  );

  const addNewCohort = () => {
    toggleDrawer();
    dispatch(setSecondaryContent('second'));
    dispatch(setPrimaryContent(''));
  };


  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

  const goToCohort = (cohortId) => {
    navigate(`${cohortId}`);
  };

  const PageSize = 5;

  const filteredCohorts = useMemo(() => {
    if (!cohorts || !cohorts.data) return [];
    switch (filterStatus) {
      case 'Completed':
        return cohorts.data.filter((cohort) => cohort.status === 'Completed');
      case 'In Progress':
        return cohorts.data.filter((cohort) => cohort.status === 'InProgress');
      case 'In Review':
        return cohorts.data.filter((cohort) => cohort.status === 'InReview');
      default:
        return cohorts.data;
    }
    // if (filterStatus === 'Completed Courses') {
    //   return cohorts.data.filter((cohort) => cohort.Status === 'Completed');
    // } else if (filterStatus !== 'All') {
    //   return cohorts.data.filter((cohort) => cohort.Status === filterStatus);
    // } else {
    //   return cohorts.data;
    // }
  }, [cohorts, filterStatus]);

  // console.log(filterStatus, filteredCohorts);
  // console.log(filteredCohorts.length);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    let filteredData = Array.isArray(filteredCohorts)
      ? filteredCohorts.slice(firstPageIndex, lastPageIndex).map((cohort) => ({
          ...cohort,
        }))
      : [];

    if (searchTerm) {
      filteredData = filteredData.filter((cohort) =>
        Object.values(cohort).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return filteredData;
  }, [filteredCohorts, currentPage, PageSize, searchTerm]);

  useEffect(() => {
    if (cohorts) {
      console.log('Cohorts', cohorts.data);
    }
  }, [cohorts]);

  if (isLoading || isFetching) {
    return (
      <div>
        <Loader className={'-mt-12'} type={'loading-bars'} size={'loading-lg'} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full items-center justify-center text-headline flex flex-col "
        style={{ height: '89vh', overflow: 'hidden' }}
      >
        {error.message}
        <p>
          please{' '}
          <Link className="text-red-600" to="/signin">
            login first!
          </Link>
        </p>
        {console.log(error)}
      </div>
    );
  }

  if (isFetching || !cohorts || (Array.isArray(cohorts.data) && cohorts.data.length === 0)) {
    return (
      <div>
         <TitleCard
              topMargin={'mt-2'}
              hasDivider
              title={'Cohort Management'}
              topSideButtons={
                <TopSideButtons colored onSearch={handleSearch}  onChange={handleSearch} />
              }
              hasRadioButton={
                <RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} count={filteredCohorts.length} />
              }
              // topSideButtons={<TopSideButtons colored buttonText={'Add a cohort'} onClick={addNewCohort} />}
            >
              <div className=" flex flex-col items-center gap-4 justify-center p-4">
                <BsClipboard2X className="w-10 h-10 text-red-650" />
                <h2 className="text-headline">Nothing to see here</h2>
                <p className=" flex text-center items-center justify-center  font-semibold">
                  Click the button below to initiate the creation of a <br /> cohort as none has been established yet.
                </p>
                <Button value="Add Cohort" variant={ButtonState.SECONDARY} size={ButtonSize.s} onClick={addNewCohort} />
              </div>
            </TitleCard>
        <Drawer secondaryContent={secondaryContent === 'second' && drawerContent} defaultText={'.'} secondaryWidth={'w-1/3'} />
      </div>
    );
  }


  return (
    <>
      <div className="p-4 bg-gray-50">
        <div className="absolute -top-10 ">
          <Drawer secondaryContent={secondaryContent === 'second' && drawerContent} defaultText={'.'} secondaryWidth={'w-1/3'} />
        </div>
        <div className="pb-4">
          <BreadCrumb initialPathName={'admin'} />
        </div>
        <div>
          {filteredCohorts ? (
            <>
              <TitleCard
                topMargin={'mt-2'}
                hasDivider
                title={'Cohort Management'}
                topSideButtons={
                  <TopSideButtons colored buttonText={'Create cohort'} onClick={addNewCohort} onSearch={handleSearch}  onChange={handleSearch} />
                }
                hasRadioButton={
                  <RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} count={filteredCohorts.length} />
                }
              >
                <div>
                  {filteredCohorts.length > 0 ? (
                    <CustomTable columns={columns} data={currentTableData} onRowClick={goToCohort} id="cohortId" />
                  ) : (
                    <div className="text-center p-4">
                      {filterStatus === 'Completed' && <p>There are currently no completed cohorts.</p>}
                      {filterStatus === 'In Progress' && <p>There are currently no cohorts in progress.</p>}
                      {filterStatus === 'InReview' && <p>There are currently no cohorts in review.</p>}
                    </div>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalCount={filteredCohorts?.length}
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
              // topSideButtons={<TopSideButtons colored buttonText={'Add an admin'} onClick={addNewCohort} />}
            >
              <div className=" flex flex-col items-center gap-4 justify-center p-4">
                <BsClipboard2X className="w-10 h-10 text-red-650" />
                <h2 className="text-headline">Nothing to see here</h2>
                <p className=" flex text-center items-center justify-center  font-semibold">
                  Click the button below to initiate the creation of an <br /> admin as none has been established yet.
                </p>
                <Button value="Add Cohort" variant={ButtonState.SECONDARY} size={ButtonSize.s} onClick={addNewCohort} />
              </div>
            </TitleCard>
          )}
        </div>
      </div>
    </>
  );
};

export default Cohort;
