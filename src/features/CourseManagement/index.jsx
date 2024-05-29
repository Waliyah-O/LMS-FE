import React, { useState, useMemo } from 'react';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import TitleCard from '../../components/Cards/TitleCard';
import TopSideButtons from '../../components/TopSideButtons';
import RadioFilters from '../../components/RadioFilters';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '../../components/Drawer';
import { setDefaultContent } from '../../components/DrawerSlice';
import DrawerForms from '../../components/Forms/DrawerForm/DrawerForms';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../components/table';
import Pagination from '../../components/pagination/Pagination';
import { RECENT_PROGRAMS } from '../../utils/dummyData';
import dayjs from 'dayjs';

const Courses = () => {
  const [programs, setPrograms] = useState(RECENT_PROGRAMS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const toggleDrawer = useToggleDrawer();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCourse = (courseId) => {
    navigate(`${courseId}`);
  };

  const { startDate, endDate } = useSelector((state) => state.dateRange);

  const { defaultContent } = useSelector((state) => state.drawer);

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Completed' },
    { position: 3, label: 'In Progress' },
    { position: 4, label: 'In Review' },
  ];

  const drawerContent = (
    <>
      <DrawerForms isSchedulingClass />
    </>
  );

  const handleButtonClick = () => {
    toggleDrawer();
    dispatch(setDefaultContent('default'));
  };

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

  const columns = [
    { key: 'Course', title: 'COURSE' },
    { key: 'Status', title: 'STATUS' },
    { key: 'progress', title: 'PROGRESS' },
    { key: 'endDate', title: 'END DATE' },
    { key: 'action', title: 'ACTION' },
  ];
  return (
    <>
      <div className="absolute -top-10 ">
        <Drawer defaultContent={defaultContent === 'default' && drawerContent} defaultText={'.'} />
      </div>
      <div className="p-4 bg-gray-50">
        <div className="pb-4">
          <BreadCrumb initialPathName={'admin'} />
        </div>
        <TitleCard
          topMargin={'mt-2'}
          hasDivider
          title={'Course Management'}
          topSideButtons={
            <TopSideButtons colored icon={<FaPlus />} onClick={handleButtonClick} buttonText={'Schedule a course'} />
          }
          hasRadioButton={<RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} />}
        >
          {/* Team Member list in table format loaded constant */}
          <div className="overflow-x-auto w-full">
            <CustomTable onRowClick={goToCourse} columns={columns} data={currentTableData} id="courseId" />
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

export default Courses;
