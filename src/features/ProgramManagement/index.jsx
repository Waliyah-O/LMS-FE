import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import TitleCard from '../../components/Cards/TitleCard';
import TopSideButtons from '../../components/TopSideButtons';
import RadioFilters from '../../components/RadioFilters';
import { useGetProgramsQuery, useDeleteProgramMutation, useUpdateProgramMutation } from './programApi';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import { openModal } from '../common/modalSlice';
import { dummyProgramData } from '../../data/dummyData';
import Pagination from '../../components/pagination/Pagination';
import CustomTable from '../../components/table';
import Loader from '../../components/loading/Loader';
import { BsClipboard2X } from 'react-icons/bs';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import DrawerForms from '../../components/Forms/DrawerForm/DrawerForms';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import { setPrimaryContent, setSecondaryContent } from '../../components/DrawerSlice';
import Drawer from '../../components/Drawer';

const Program = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDrawer = useToggleDrawer();
  const PageSize = 5;

  const { data: programs, error, isLoading, isFetching } = useGetProgramsQuery();
  const { primaryContent, secondaryContent } = useSelector((state) => state.drawer);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Update program
  const [updateProgram, { isLoading: isUpdating }] = useUpdateProgramMutation();

  // Delete program
  const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();

  useEffect(() => {
    if (programs) {
      console.log('Programs Data:', programs.data);
    }
  }, [programs]);

  const handleUpdateProgram = async (id, newData) => {
    try {
      await updateProgram({ id, ...newData });
    } catch (error) {
      console.error(`Failed to update program ${id}:`, error);
    }
  };

  const handleDeleteProgram = async (id, index) => {
    try {
      await deleteProgram(id);
      dispatch(
        openModal({
          title: 'Confirmation',
          bodyType: MODAL_BODY_TYPES.CONFIRMATION,
          extraObject: {
            message: `Are you sure you want to delete this program?`,
            type: CONFIRMATION_MODAL_CLOSE_TYPES.PROGRAM_DELETE,
            index,
          },
        })
      );
    } catch (error) {
      console.error(`Failed to delete program ${id}:`, error);
    }
  };

  const openAddNewProgramModal = () => {
    dispatch(
      openModal({
        title: 'Add New Program',
        bodyType: MODAL_BODY_TYPES.PROGRAM_ADD_NEW,
      })
    );
  };
  
  const drawerContent = (
    <>
      <DrawerForms isCreatingProgram />
    </>
  );

  const addNewProgram = () => {
    toggleDrawer();
    dispatch(setSecondaryContent('second'));
    dispatch(setPrimaryContent(''));
  };

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Completed' },
    { position: 3, label: 'In Progress' },
    { position: 4, label: 'In Review' },
  ];

  // const columns = [
  //   { key: 'programName', title: 'program' },
  //   { key: 'description', title: 'description' },
  //   { key: 'cohort', title: 'cohort' },
  //   { key: 'status', title: 'status' },
  //   // { key: 'isEnded', title: 'in session? ' },
  //   { key: 'endDate', title: 'Due Date' },
  // ];
  const columns = [
    { key: 'program', title: 'program' },
    { key: 'cohort', title: 'cohort' },
    { key: 'course', title: 'course' },
    { key: 'tutor', title: 'tutor' },
    { key: 'student', title: 'student' },
    { key: 'Status', title: 'status' },
    { key: 'endDate', title: 'Due Date' },
  ];

  const goToProgram = (programId) => {
    navigate(`${programId}`);
  };

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

  const filteredPrograms = useMemo(() => {
    switch (filterStatus) {
      case 'Completed':
        return dummyProgramData.filter((user) => user.Status === 'Completed');
      case 'In Progress':
        return dummyProgramData.filter((user) => user.Status === 'In Progress');
      case 'In Review':
        return dummyProgramData.filter((user) => user.Status === 'In Review');
      default:
        return dummyProgramData;
    }
  }, [filterStatus]);

  // const filteredPrograms = useMemo(() => {
  //   if (!programs || !programs.data) return [];
  //   switch (filterStatus) {
  //     case 'Completed':
  //       return programs.data.filter((program) => program.status === 'Completed');
  //     case 'In Progress':
  //       return programs.data.filter((program) => program.status === 'In Progress');
  //     case 'In Review':
  //       return programs.data.filter((program) => program.status === 'InReview');
  //     default:
  //       return programs.data;
  //   }
  // }, [filterStatus, programs]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    let filteredData = Array.isArray(filteredPrograms)
      ? filteredPrograms.slice(firstPageIndex, lastPageIndex).map((program) => ({ ...program }))
      : [];

    if (searchTerm) {
      filteredData = filteredData.filter((program) =>
        Object.values(program).some(
          (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filteredData;
  }, [currentPage, filteredPrograms, searchTerm]);

  if (isFetching || isLoading) {
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

  // if (!programs || (Array.isArray(programs.data) && programs.data.length === 0)) {
  //   return (
  //     <div>
  //        <TitleCard
  //             topMargin={'mt-2'}
  //             hasDivider
  //             title={'Cohort Management'}
  //             topSideButtons={
  //               <TopSideButtons colored onSearch={handleSearch}  onChange={handleSearch} />
  //             }
  //             hasRadioButton={
  //               <RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} count={filteredPrograms.length} />
  //             }
  //             // topSideButtons={<TopSideButtons colored buttonText={'Add a cohort'} onClick={addNewCohort} />}
  //           >
  //             <div className=" flex flex-col items-center gap-4 justify-center p-4">
  //               <BsClipboard2X className="w-10 h-10 text-red-650" />
  //               <h2 className="text-headline">Nothing to see here</h2>
  //               <p className=" flex text-center items-center justify-center  font-semibold">
  //                 Click the button below to initiate the creation of a <br /> program as none has been established yet.
  //               </p>
  //               <Button value="Add Program" variant={ButtonState.SECONDARY} size={ButtonSize.s} onClick={addNewProgram} />
  //             </div>
  //           </TitleCard>
  //       <Drawer secondaryContent={secondaryContent === 'second' && drawerContent} defaultText={'.'} secondaryWidth={'w-1/3'} />
  //     </div>
  //   );
  // }


  return (
    <>
      <div className="p-4 bg-gray-50">
        <div className="absolute -top-10 ">
          <Drawer secondaryContent={secondaryContent === 'second' && drawerContent} defaultText={'.'} secondaryWidth={'w-1/3'} />
        </div>
        <div className="pb-4">
          <BreadCrumb initialPathName={'super-admin'} />
        </div>

        <div>
          {filteredPrograms ? (
            <>
              <TitleCard
                topMargin={'mt-2'}
                hasDivider
                title={'Program Management'}
                topSideButtons={
                  <TopSideButtons colored buttonText={'Create program'} onClick={addNewProgram} onSearch={handleSearch}  onChange={handleSearch} />
                }
                hasRadioButton={
                  <RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} count={filteredPrograms.length} />
                }
              >
                <div>
                  {filteredPrograms.length > 0 ? (
                    <CustomTable columns={columns} data={currentTableData} onRowClick={goToProgram} id="programId" />
                  ) : (
                    <div className="text-center p-4">
                      {filterStatus === 'Completed' && <p>There are currently no completed programs.</p>}
                      {filterStatus === 'In Progress' && <p>There are currently no programs in progress.</p>}
                      {filterStatus === 'InReview' && <p>There are currently no programs in review.</p>}
                    </div>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalCount={filteredPrograms?.length}
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
              // topSideButtons={<TopSideButtons colored buttonText={'Add an admin'} onClick={addNewProgram} />}
            >
              <div className=" flex flex-col items-center gap-4 justify-center p-4">
                <BsClipboard2X className="w-10 h-10 text-red-650" />
                <h2 className="text-headline">Nothing to see here</h2>
                <p className=" flex text-center items-center justify-center  font-semibold">
                  Click the button below to initiate the creation of an <br /> admin as none has been established yet.
                </p>
                <Button value="Add Program" variant={ButtonState.SECONDARY} size={ButtonSize.s} onClick={addNewProgram} />
              </div>
            </TitleCard>
          )}
        </div>
      </div>
    </>
  );
};

export default Program;
