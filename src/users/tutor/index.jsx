import moment from 'moment';
import { useEffect, useState, useMemo } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import { RECENT_PROGRAMS } from '../../utils/dummyData';
import SearchBar from '../../components/customInputs/SearchBar';
import Pagination from '../../components/pagination/Pagination';
import ProgressBar from '../../components/progressbar/index';
import InfoSection from '../../components/InfoSection';
import flutterWaveLogo from '../../assets/images/flutterwave.png'
import apLogo from '../../../assets/images/africa-prudential.png';
import accessLogo from '../../../assets/images/access-bank.png';
import searchIcon from '../../assets/svg/search.svg';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../../../../components/customInputs/RadioButton';
import { BsFillFunnelFill } from 'react-icons/bs';

const TopSideButtons = () => {
  return (
    <div className="flex flex-col items-center my-3 md:flex-row gap-4">
      <div className="relative w-full md:w-fit">
        <div className="">
          <SearchBar customStyles="input-sm placeholder-slate-400 text-gray-800 pl-8 w-[20rem] lg:w-[26rem]" />
          <div className="absolute inset-y-0 left-2 flex items-center">
            <img src={searchIcon} alt="searchicon" />
          </div>
        </div>

        <div className="absolute inset-y-0 top-[1px] right-0 flex items-center">
          <Button variant={ButtonState.SEARCH} size={ButtonSize.s} value="Search" />
        </div>
      </div>

      <div className="hidden md:block">
        <label className="btn btn-sm btn-outline">
          <BsFillFunnelFill />
          Filter
        </label>
      </div>
    </div>
  );
};

const RadioFilters = ({ onFilterChange }) => {
  const radioOptions = [
    { position: 1, label: 'All' },
    { position: 2, label: 'Completed Courses' },
    { position: 3, label: 'In Progress' },
    { position: 4, label: 'In Review' },
  ];

  const [sortBy, setSortBy] = useState('All');

  const handleOptionChange = (selectedOption) => {
    setSortBy(selectedOption);
    onFilterChange(selectedOption);
  };

  return (
    <div className="flex flex-col gap-2 text-gray-800 font-semibold pb-4 md:flex-row">
      <span>Show Only:</span>
      <div className="flex gap-1.5 items-center flex-wrap md:gap-4">
        {radioOptions.map((option) => (
          <RadioButton
            key={option.position}
            option={option}
            value={option.label}
            onChange={() => handleOptionChange(option.label)}
            checked={sortBy === option.label}
          />
        ))}
      </div>
    </div>
  );
};

function Home() {
  const [programs, setPrograms] = useState(RECENT_PROGRAMS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');

  const getColorBasedOnStatus = (status) => {
    switch (status) {
      case 'In Progress':
        return '#1C64F2';
      case 'Completed':
        return '#31C48D';
      case 'In Review':
        return '#FACA15';
      default:
        return '';
    }
  };
  const getBGColorBasedOnStatus = (status) => {
    switch (status) {
      case 'In Progress':
        return '#E1EFFE';
      case 'Completed':
        return '#DEF7EC';
      case 'In Review':
        return '#FDF6B2';
      default:
        return '';
    }
  };

  const PageSize = 5;

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    setCurrentPage(1);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const filteredPrograms =
      filterStatus === 'Completed Courses'
        ? programs.filter((program) => program.Status === 'Completed')
        : filterStatus === 'All'
        ? programs
        : programs.filter((program) => program.Status === filterStatus);

    return filteredPrograms.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, programs, filterStatus]);

  const navigate = useNavigate();

  const goToOrgs = () => {
    navigate('/dashboard/admin-management');
  };

  const asideContentData = [
    {
      logo: flutterWaveLogo,
      name: 'Flutterwave',
    },

    {
      logo: apLogo,
      name: 'Africa Prudential',
    },

    {
      logo: accessLogo,
      name: 'Access Bank',
    },
  ];

  const asideContent = (
    <div className="rounded-md p-6 h-full shadow-gray-200 drop-shadow-md bg-white md:grid place-content-center gap-2">
      <h1 className="-mt-2 text-gray-500 font-semibold">Recently Joined Organizations</h1>
      <ul className="list-none flex flex-col h-full gap-2 md:items-start justify-evenly">
        {asideContentData.map((organization, index) => (
          <li className="flex items-center gap-2" key={index}>
            <img src={organization.logo} alt={organization.name} />
            <div className="flex flex-col">
              <h2 className="text-gray-800 font-semibold">{organization.name}</h2>
              <Link className="text-red-500 underline text-xs -mt-1">View Details</Link>
            </div>
          </li>
        ))}
        <Button variant={ButtonState.DarkOutline} size={ButtonSize.sm} value="View Organizations" onClick={goToOrgs} />
      </ul>
    </div>
  );

  return (
    <>
      <InfoSection asideContent={asideContent}>
        <TitleCard
          title={`Organizations' Programs`}
          topMargin="mt-2"
          TopSideButtons={<TopSideButtons />}
          hasRadioButton={<RadioFilters onFilterChange={handleFilterChange} />}
        >
          {/* Team Member list in table format loaded constant */}
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead className="uppercase">
                <tr>
                  <th>Organization</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>DUE DATE</th>
                  <th>Progress</th>
                </tr>
              </thead>

              <tbody>
                {currentTableData.map((l, k) => {
                  return (
                    <tr className="hover text-blue-900 font-inter font-medium" key={k}>
                      <td className="capitalize w-44 text-sm">{l.Organization}</td>
                      <td className="capitalize w-52 text-sm">{l.Course}</td>
                      <td className="text-labels w-44">
                        <span
                          className="px-1.5 py-1 rounded-lg"
                          style={{
                            color: getColorBasedOnStatus(l.Status),
                            backgroundColor: getBGColorBasedOnStatus(l.Status),
                          }}
                        >
                          {l.Status}
                        </span>
                      </td>
                      <td className="w-44 text-labels">{moment(l.DUE_DATE).format('DD MMM YYYY')}</td>
                      <td>
                        <span className="flex flex-col  text-slate-500 text-labels md:items-end">
                          {`${l.progress}%`}
                          <span className="hidden md:block w-full">
                            <ProgressBar color={getColorBasedOnStatus(l.Status)} progress={l.progress} />
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      </InfoSection>
    </>
  );
}

export default Home;
