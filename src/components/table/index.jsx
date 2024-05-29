import dayjs from 'dayjs';
import ProgressBar from '../progressbar';

const CustomTable = ({ columns, data, onRowClick, id }) => {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const getColorAndBGColorBasedOnStatus = (status) => {
    switch (status) {
      case 'In Progress':
      case 'InProgress':
        return {
          textColor: '#1C64F2',
          bgColor: '#E1EFFE',
          progressBarColor: '#1C64F2',
        };
      case 'Completed':
        return {
          textColor: '#31C48D',
          bgColor: '#DEF7EC',
          progressBarColor: '#31C48D',
        };
      case 'InReview':
      case 'In Review':
        return {
          textColor: '#FACA15',
          bgColor: '#FDF6B2',
          progressBarColor: '#FACA15',
        };
      case 'Active':
        return {
          textColor: '#03543F',
          bgColor: '#DEF7EC',
        };
      case 'Disabled':
      case 'Upcoming':
        return {
          textColor: '#723B13',
          bgColor: '#FDF6B2',
        };
      case 'Inactive':
      case 'Recorded':
        return {
          textColor: '#811818',
          bgColor: '#fdb2b2',
        };
      default:
        return { textColor: '', bgColor: '', progressBarColor: '' };
    }
  };

  const colorByUser = (status) => {
    switch (status) {
      case 'Tutor':
        return {
          bgColor: '#0E9F6E',
        };
      case 'Student':
        return {
          bgColor: '#F05252',
        };

      default:
        return { bgColor: '' };
    }
  };

  return (
    <div className="">
      <table className="table">
        <thead className="uppercase">
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              onClick={() => onRowClick(row.id || row[id])}
              className="hover text-blue-900 cursor-pointer font-inter font-medium"
              key={rowIndex}
            >
              <td className="flex items-center gap-2">
                {(row.avatar || row.logoUrl) && (
                  <img src={row.avatar || row.logoUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
                )}

                <span>{row[columns[0].key]}</span>
              </td>
              {columns.slice(1).map((column) => (
                <td className="capitalize text-sm w-fit" key={column.key}>
                  {column.key === 'endDate' ? (
                    <span className="text-labels">{dayjs(row[column.key]).format('DD MMM YYYY')}</span>
                  ) : column.key === 'Status' ||
                    column.key === 'organizationStatus' ||
                    (column.key === 'status' && row[column.key]) ? (
                    <span
                      className="px-1.5 py-1 w-3 rounded-lg"
                      style={{
                        color: getColorAndBGColorBasedOnStatus(row[column.key]).textColor,
                        backgroundColor: getColorAndBGColorBasedOnStatus(row[column.key]).bgColor,
                      }}
                    >
                      {row[column.key]}
                    </span>
                  ) : column.key === 'progress' && row[column.key] ? (
                    <div className="flex flex-col text-slate-500 text-labels md:items-end">
                      {`${row[column.key]}%`}
                      <ProgressBar
                        progress={row[column.key]}
                        color={getColorAndBGColorBasedOnStatus(row['Status']).progressBarColor}
                      />
                    </div>
                  ) : column.key === 'userType' && row[column.key] ? (
                    <span className="flex items-center">
                      <div
                        className="h-2 w-2 rounded-full mr-1"
                        style={{
                          backgroundColor: colorByUser(row[column.key]).bgColor,
                        }}
                      />
                      <span className="font-semibold">{row[column.key]}</span>
                    </span>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
