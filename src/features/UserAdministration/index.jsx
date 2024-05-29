import React, { useState, useMemo } from 'react';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import TitleCard from '../../components/Cards/TitleCard';
import TopSideButtons from '../../components/TopSideButtons';
import { FaFileDownload } from 'react-icons/fa';
import RadioFilters from '../../components/RadioFilters';
import { USER_INFO } from '../../utils/dummyData';
import CustomTable from '../../components/table';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Pagination from '../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const UserAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { startDate, endDate } = useSelector((state) => state.dateRange);
  const navigate = useNavigate();

  const goToProfile = (userId) => {
    navigate(`${userId}`);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const columns = [
    { key: 'user', title: 'USER' },
    { key: 'userType', title: 'USER TYPE' },
    { key: 'program', title: 'PROGRAM' },
    { key: 'cohort', title: 'COHORT' },
    { key: 'Status', title: 'STATUS' },
    { key: 'lastLogin', title: 'LAST LOGIN' },
  ];

  const PageSize = 5;

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    switch (filterStatus) {
      case 'Tutors':
        return USER_INFO.filter((user) => user.userType === 'Tutor');
      case 'Students':
        return USER_INFO.filter((user) => user.userType === 'Student');
      case 'Active':
        return USER_INFO.filter((user) => user.Status === 'Active');
      case 'Disabled':
        return USER_INFO.filter((user) => user.Status === 'Disabled');
      default:
        return USER_INFO;
    }
  }, [filterStatus]);

  const formatLastLogin = (timestamp) => {
    return dayjs(timestamp).format('DD MMM YYYY, h:mm:ss A');
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    let filteredData = Array.isArray(filteredUsers)
      ? filteredUsers
          .slice(firstPageIndex, lastPageIndex)
          .map((user) => ({ ...user, lastLogin: formatLastLogin(user.lastLogin) }))
      : [];

    if (searchTerm) {
      filteredData = filteredData.filter((user) =>
        Object.values(user).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return filteredData;
    // return filteredUsers.slice(firstPageIndex, lastPageIndex).map((user) => ({
    //   ...user,
    //   lastLogin: formatLastLogin(user.lastLogin),
    // }));
  }, [currentPage, filteredUsers, searchTerm]);

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Tutors' },
    { position: 3, label: 'Students' },
    { position: 4, label: 'Active' },
    { position: 5, label: 'Disabled' },
  ];

  const exportCSV = () => {
    const csvContent = formatDataAsCSV(USER_INFO);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'user_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const formatDataAsCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    data.forEach((row) => {
      const values = headers.map((header) => row[header]);
      csvRows.push(values.join(','));
    });
    return csvRows.join('\n');
  };

  return (
    <>
      <div className="p-4 bg-gray-50 ">
        <div className="pb-4">
          <BreadCrumb initialPathName={'admin'} />
        </div>
        <TitleCard
          topMargin={'mt-2'}
          hasDivider
          title={'User Administration'}
          topSideButtons={
            <TopSideButtons
              icon={<FaFileDownload style={{ fontSize: '1rem' }} />}
              buttonText={'Export CSV'}
              onClick={exportCSV}
              onChange={handleSearch}
            />
          }
          hasRadioButton={<RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} />}
        >
          <div>
            <CustomTable onRowClick={goToProfile} columns={columns} data={currentTableData} />
          </div>

          <div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={USER_INFO.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </TitleCard>
      </div>
    </>
  );
};

export default UserAdmin;
