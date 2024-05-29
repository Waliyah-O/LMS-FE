import { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import RadioFilters from '../../components/RadioFilters';
import TopSideButtons from '../../components/TopSideButtons';

const Admissions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Active' },
    { position: 3, label: 'Disabled' },
    { position: 4, label: 'Inactive' },
  ];
  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };
  return (
    <div>
      <TitleCard
        topMargin={'mt-2'}
        title={'Admissions Management'}
        topSideButtons={<TopSideButtons colored buttonText={'click me'} />}
        hasRadioButton={<RadioFilters radioOptions={radioOptions} onFilterChange={handleFilterChange} />}
      ></TitleCard>
    </div>
  );
};

export default Admissions;
