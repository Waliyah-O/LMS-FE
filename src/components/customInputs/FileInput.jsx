import { useState } from 'react';

const FileInput = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
    if (onChange) {
      onChange(file);
    }
  };

  return (
    <div className=" ">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select a file</span>
          <span className="label-text-alt"></span>
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        <div className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt"></span>
        </div>
      </label>
      {/* <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }} // hide the default file input
      />
      <label htmlFor="fileInput" className="custom-file-input-label">
        {selectedFile ? selectedFile.name : 'Choose a file'}
      </label>
      <button onClick={() => document.getElementById('fileInput').click()}>Browse</button> */}
    </div>
  );
};

export default FileInput;
