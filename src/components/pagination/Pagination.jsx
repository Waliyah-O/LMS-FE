
import { usePagination, DOTS } from '../../hooks/usePagination';
const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <ul
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '5px' }}
        className={('join', { [className]: className })}
      >
        <li
          className={`join-item rounded-full bg-[hsla(220,12%,95%,1)] px-4 py-2 cursor-pointer ${
            currentPage === 1 ? 'btn-disabled cursor-pointer' : null
          }`}
          onClick={onPrevious}
        >
          <button className="join-item text-lg font-bold">«</button>
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li key={pageNumber} className="join-item btn cursor-pointer">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={`join-item px-4 py-2 mx-1.5 border border-[#c1c1c1] rounded-full ${
                pageNumber === currentPage
                  ? 'bg-[hsla(5,70%,49%,1)] rounded-full text-white cursor-pointer font-bold'
                  : 'bg-transparent cursor-pointer font-semibold'
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={`join-item rounded-full bg-[hsla(220,12%,95%,1)] px-4 py-2 cursor-pointer ${
            currentPage === lastPage ? 'btn-disabled cursor-pointer' : null
          }`}
          onClick={onNext}
        >
          <button className="join-item text-lg font-bold">»</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
