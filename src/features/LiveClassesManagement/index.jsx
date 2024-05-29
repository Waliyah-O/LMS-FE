import React, { useState } from 'react';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import TitleCard from '../../components/Cards/TitleCard';
import TopSideButtons from '../../components/TopSideButtons';
import RadioFilters from '../../components/RadioFilters';

const LiveClass = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');

  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Upcoming Sessions' },
    { position: 3, label: 'Recorded Sessions' },
  ];

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };
  return (
    <>
      <div className="p-4 bg-gray-50">
        <div className="pb-4">
          <BreadCrumb initialPathName={'admin'} />
        </div>
        <TitleCard
          topMargin={'mt-2'}
          hasDivider
          title={'Live Classes Management'}
          topSideButtons={<TopSideButtons colored buttonText={'Schedule Live Class'} />}
          hasRadioButton={<RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} />}
        ></TitleCard>
      </div>
    </>
  );
};

export default LiveClass;
