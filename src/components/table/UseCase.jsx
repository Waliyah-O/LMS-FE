import React, { useState, useMemo } from 'react';
import RECENT_PROGRAMS from 'route to data';
import Pagination from 'wherever'
import CustomTable from 'wherever';

const PageSize = 5;

const UseCase = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = (currentPage + 1) * PageSize;
    return RECENT_PROGRAMS.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  // key is the value coming from the data structure, title is what you want to appear on the UI
  const columns = [
    { key: 'program', title: 'PROGRAMS' },
    { key: 'cohort', title: 'COHORTS' },
    { key: 'course', title: 'COURSES' },
    { key: 'tutor', title: 'TUTORS' },
    { key: 'student', title: 'STUDENTS' },
    { key: 'status', title: 'STATUS' },
    { key: 'endDate', title: 'END DATE' },
  ];
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CustomTable columns={columns} data={currentTableData} />
        <Pagination
          currentPage={currentPage}
          totalCount={RECENT_PROGRAMS.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default UseCase;
