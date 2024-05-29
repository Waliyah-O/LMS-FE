import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress, width, height, color }) => {
  const progressStyle = {
    width: `${progress}%`,
    height: height,
    backgroundColor: color,
    transition: 'width 0.3s ease-in-out',
  };

  return (
    <div style={{ width: '100%', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
      <div style={progressStyle}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // Progress value (0 to 100)
  width: PropTypes.string, // Width of the progress bar (default is '100%')
  height: PropTypes.string, // Height of the progress bar (default is '20px')
  color: PropTypes.string, // Color of the progress bar (default is '#4CAF50')
};

ProgressBar.defaultProps = {
  width: '100%',
  height: '8px',
  color: '#4CAF50',
};

export default ProgressBar;
