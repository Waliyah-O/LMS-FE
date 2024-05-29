import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useGetOrganizationCountQuery, useGetOrganizationsQuery } from './AdminApi';
import Loader from '../../components/loading/Loader';
import CustomTable from '../../components/table';
import TopSideButtons from '../../components/TopSideButtons';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import RadioFilters from '../../components/RadioFilters';
import Pagination from '../../components/pagination/Pagination';
import TitleCard from '../../components/Cards/TitleCard';
import Button from '../../components/button';
import { BsClipboard2X } from 'react-icons/bs';
import { ButtonSize, ButtonState } from '../../components/button/enum';

function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PageSize = 5;

  const { data: admins, error, isLoading, isFetching } = useGetOrganizationsQuery();

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Active' },
    { position: 3, label: 'Inactive' },
    { position: 4, label: 'Disabled' },
  ];

  const columns = [
    { key: 'organizationName', title: 'ORGANIZATION NAME' },
    { key: 'adminFullName', title: 'Admin name' },
    { key: 'organizationStatus', title: 'STATUS' },
    { key: 'endDate', title: 'DUE DATE' },
    { key: 'progress', title: 'PROGRESS' },
  ];

  // const columns = [
  //   { key: 'organizationName', title: 'ORGANIZATION NAME' },
  //   { key: 'Course', title: 'COURSES' },
  //   { key: 'organizationStatus', title: 'STATUS' },
  //   { key: 'endDate', title: 'DUE DATE' },
  //   { key: 'progress', title: 'PROGRESS' },
  // ];

  const goToAdmin = (organizationId) => {
    navigate(`${organizationId}`);
  };

  const goToPreSignup = () => {
    navigate(`/super-admin/dashboard/create-account`);
  };

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

  // const adminsData = admins && admins.data ? admins.data : []; // Default to an empty array if admins.data is null or undefined
  
  const adminsData = admins && admins.data ? [...admins.data] : [];
  const reversedData = adminsData.reverse();
  console.log(reversedData);

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

    return filteredData;
  }, [currentPage, filteredAdmins, PageSize]);

  const searchedAdmins = useMemo(() => {
    if (!searchTerm) {
      return currentTableData;
    }

    

    return filteredAdmins.filter((admin) =>
      Object.values(admin).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, filteredAdmins, currentTableData]);

  // Use searchedAdmins in the component for rendering or further processing

  // const filteredAdmins = useMemo(() => {
  //   switch (filterStatus) {
  //     case 'All':
  //       return adminsData;
  //     case 'Active':
  //       return adminsData.filter((admin) => admin.organizationStatus === 'Active');
  //     case 'Disabled':
  //       return adminsData.filter((admin) => admin.organizationStatus === 'Disabled');
  //     case 'Inactive':
  //       return adminsData.filter((admin) => admin.organizationStatus === 'Inactive');
  //     default:
  //       return adminsData; // Handle unexpected filterStatus values by returning the entire adminsData
  //   }
  // }, [admins, filterStatus]);

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;

  //   let filteredData = Array.isArray(filteredAdmins)
  //     ? filteredAdmins.slice(firstPageIndex, lastPageIndex).map((admin) => ({ ...admin }))
  //     : [];

  //   if (searchTerm) {
  //     filteredData = filteredData.filter((admin) =>
  //       Object.values(admin).some((value) =>
  //         typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //   }

  //   return filteredData;

  //   // return Array.isArray(filteredAdmins) ? filteredAdmins.slice(firstPageIndex, lastPageIndex) : [];
  // }, [currentPage, filteredAdmins, PageSize, searchTerm]);

  useEffect(() => {
    console.log('Filtered Admins:', filteredAdmins);
    console.log('Searched Admins:', searchedAdmins);
  }, [filteredAdmins, searchedAdmins]);

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

  if (!admins || (Array.isArray(admins.data) && admins.data.length === 0)) {
    return (
      <div className="w-full h-screen border border-red-600 flex flex-col items-center justify-center">
        <BsClipboard2X className="w-40 h-40 text-red-650" />
        <h2 className="text-headline">No Admin here</h2>
        <p className=" flex text-center items-center justify-center  font-semibold">
          Click the button below to initiate the creation of a <br /> curriculum & courses as none has been established yet.
        </p>
        <Button value="Add Admin" variant={ButtonSize.ALT_DARK} size={ButtonState.md} onClick={goToPreSignup} />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-gray-50">
        <BreadCrumb initialPathName={'admin'} />
        <div>
          {filteredAdmins && filteredAdmins.length > 0 ? (
            <>
              <TitleCard
                topMargin={'mt-2'}
                hasDivider
                title={'Organization Admin Management'}
                topSideButtons={
                  <TopSideButtons
                    colored
                    buttonText={'Add an admin'}
                    onClick={goToPreSignup}
                    onSearch={handleSearch}
                    onChange={handleSearch}
                  />
                }
                hasRadioButton={
                  <RadioFilters
                    radioOptions={radioOptions}
                    onFilterChange={handleFilterChange}
                    count={searchTerm ? searchedAdmins.length : filteredAdmins.length}
                  />
                }
              >
                <div>
                  {searchedAdmins && searchedAdmins.length > 0 ? (
                    <CustomTable columns={columns} data={searchedAdmins} onRowClick={goToAdmin} id="organizationId" />
                  ) : (
                    <div className="text-center p-4">
                      <p>No admins found matching the search term.</p>
                    </div>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalCount={searchTerm ? searchedAdmins.length : filteredAdmins.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </TitleCard>
            </>
          ) : (
            <TitleCard topMargin={'mt-2'} hasDivider title={'Organization Admin Management'}>
              <div className=" flex flex-col items-center gap-4 justify-center p-4">
                <BsClipboard2X className="w-10 h-10 text-red-650" />
                <h2 className="text-headline">Nothing to see here</h2>
                <p className="flex text-center items-center justify-center font-semibold">
                  Click the button below to initiate the creation of an admin as none has been established yet.
                </p>
                <Button value="Add Admin" variant={ButtonState.SECONDARY} size={ButtonSize.s} onClick={goToPreSignup} />
              </div>
            </TitleCard>
          )}
        </div>
        {/* <div>
          {filteredAdmins ? (
            <>
              <TitleCard
                topMargin={'mt-2'}
                hasDivider
                title={'Organization Admin Management'}
                topSideButtons={
                  <TopSideButtons
                    colored
                    buttonText={'Add an admin'}
                    onClick={goToPreSignup}
                    onSearch={handleSearch}
                    onChange={handleSearch}
                  />
                }
                hasRadioButton={
                  <RadioFilters
                    radioOptions={radioOptions}
                    onFilterChange={handleFilterChange}
                    count={searchTerm ? searchedAdmins.length : filteredAdmins.length}
                  />
                }
              >
                <div>
                  {filteredAdmins.length > 0 && searchedAdmins.length > 0 ? (
                    <CustomTable
                      columns={columns}
                      data={searchTerm ? searchedAdmins : currentTableData}
                      onRowClick={goToAdmin}
                      id="organizationId"
                    />
                  ) : (
                    <div className="text-center p-4">
                      {filterStatus === 'Active' && <p>There are currently no active admins.</p>}
                      {filterStatus === 'Disabled' && <p>There are currently no disabled admins.</p>}
                      {filterStatus === 'Inactive' && <p>There are currently no inactive admins.</p>}
                    </div>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalCount={searchedAdmins ? searchedAdmins.length : filteredAdmins.length}
                    // totalCount={searchTerm ? searchedAdmins?.length : filteredAdmins?.length}
                    pageSize={PageSize}
                    // pageSize={PageSize}
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
        </div> */}
      </div>
    </>
  );
}

export default Admin;
