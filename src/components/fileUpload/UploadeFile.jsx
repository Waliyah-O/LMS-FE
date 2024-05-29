import React, { useRef, useState, useEffect } from 'react';
import { BsCloudUpload, BsFiletypeCsv, BsFiletypeExe, BsFiletypePdf, BsFiletypePpt } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { showToast } from '../../utils';

const UploadFile = ({
  labelText,
  id,
  symbols,
  labelRightText,
  className,
  inputError,
  allowedFileTypes = [], // Array of allowed file extensions (e.g., ['jpg', 'png'])
  maxFileSize = 5, // Maximum file size in MB (default: 5)
  multiple = false, // Allow multiple file selection
  defaultValue = null, // Default file (object with name and url)
  onBlur,
  onFocus,
  onChange, // Function to handle file selection (receives an array of files)
  readOnly = false,
  ...rest // Other props for customization
}) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedFiles([defaultValue]);
      setPreviewUrls([defaultValue.url]);
      setFileTypes([defaultValue.type]);
    }
  }, [defaultValue]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const updatedFiles = [];
    const updatedPreviewUrls = [];
    const updatedFileTypes = [];

    // Check for allowed file types and size limits
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split('.').pop().toLowerCase();
      const fileSize = file.size / (1024 * 1024); // Convert to MB

      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(extension)) {
        console.warn(`File "${file.name}" has an unsupported file type. Allowed types: ${allowedFileTypes.join(', ')}`);
		showToast(`File "${file.name}" has an unsupported file type. Allowed types: ${allowedFileTypes.join(', ')}`, 'error');
        continue;
      }

      if (fileSize > maxFileSize) {
        console.warn(`File "${file.name}" exceeds the maximum file size of ${maxFileSize} MB.`);
        showToast(`File "${file.name}" exceeds the maximum file size of ${maxFileSize} MB.`, 'error');
        continue;
      }

      updatedFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPreviewUrls.push(reader.result);
      };
      reader.readAsDataURL(file);
      updatedFileTypes.push(file.type);
    }

    setSelectedFiles([...selectedFiles, ...updatedFiles]);
    setPreviewUrls([...previewUrls, ...updatedPreviewUrls]);
    setFileTypes([...fileTypes, ...updatedFileTypes]);

    if (onChange) {
      onChange(updatedFiles);
    }
  };

  const handleUpload = () => {
    // Handle upload logic here (e.g., send files to server)
    console.log('Uploading files:', selectedFiles);
  };

  const handleFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileDeletion = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviewUrls = [...previewUrls];
    const updatedFileTypes = [...fileTypes];
    updatedFiles.splice(index, 1);
    updatedPreviewUrls.splice(index, 1);
    updatedFileTypes.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviewUrls);
    setFileTypes(updatedFileTypes);
    if (onChange) {
      onChange(updatedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    setSelectedFiles([file]);
    if (file) {
		const reader = new FileReader();
		reader.onloadend = () => {
        setPreviewUrls([reader.result]);
      };
      reader.readAsDataURL(file);

      if (onChange) {
        onChange([file]);
      }
    }
  };

  return (
    <div className={`file-upload ${className} border border-dashed flex flex-col items-center justify-center`}>
      <label htmlFor={id}>
        {labelText}
        {symbols && (
          <span className="file-upload-symbols">
            {symbols.map((symbol, index) => (
              <span key={index} className="file-upload-symbol">
                {symbol}
              </span>
            ))}
          </span>
        )}
        {labelRightText && <span className="file-upload-label-right-text">{labelRightText}</span>}
      </label>
      <div
        className={`file-upload-input-container ${inputError ? 'error' : ''} ${readOnly ? 'read-only' : ''}`}
        onClick={!readOnly ? handleFileSelection : undefined}
        onDragOver={!readOnly ? handleDragOver : undefined}
        onDrop={!readOnly ? handleDrop : undefined}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple={multiple}
          accept={allowedFileTypes.length > 0 ? allowedFileTypes.join(',') : undefined}
          onBlur={onBlur}
          onFocus={onFocus}
          readOnly={readOnly}
          {...rest}
        />
        {selectedFiles.length === 0 && (
          <div className="file-upload-placeholder">
            <IoSearch className="file-upload-placeholder-icon" />
            <span className="file-upload-placeholder-text">Choose a file or drag it here</span>
          </div>
        )}
        {selectedFiles.length > 0 && (
          <div className="file-upload-preview">
            {previewUrls.map((url, index) => (
              <div key={index} className="file-upload-preview-item">
                <img src={url} alt="File Preview" className="file-upload-preview-image" />
                {!readOnly && (
                  <button
                    className="file-upload-preview-delete"
                    onClick={() => handleFileDeletion(index)}
                    disabled={readOnly}
                  >
                    <RiDeleteBin5Line />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {!readOnly && (
          <button className="file-upload-add" onClick={handleFileSelection}>
            <AiOutlineFileAdd />
          </button>
        )}
      </div>
      {inputError && <span className="file-upload-error">{inputError}</span>}
      {!readOnly && selectedFiles.length > 0 && (
        <button className="file-upload-button" onClick={handleUpload}>
          <BsCloudUpload />
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadFile;

/******************************USE CASE ********************/

{/* <UploadFile
labelText="Upload Organization Logo"
id="organizationLogo"
allowedFileTypes={['jpg', 'jpeg', 'png', 'gif']}
maxFileSize={5}
onChange={(files) => {
  const file = files[0];
  setSelectedLogo(file); // Set selected logo for preview
  // Convert selected image to URL
  const logoUrl = URL.createObjectURL(file);
  // Set the URL to OrganizationLogo field in formik
  formik.setFieldValue('OrganizationLogo', logoUrl);
}}
defaultValue={formik.values.OrganizationLogo}
/>

{selectedLogo && (
<div>
  <h3>Selected Logo:</h3>
  <img className="w-1/3" src={URL.createObjectURL(selectedLogo)} alt="Organization Logo" />
</div>
)} */}