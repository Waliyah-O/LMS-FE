import React, { useRef, useState } from 'react';
import { BsCloudUpload, BsFiletypeCsv, BsFiletypeExe, BsFiletypePdf, BsFiletypePpt } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

const FileUpload = ({ labelText, id, setFieldValue, onBlur, errors, symbols, labelRightText, value, name }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFile([...selectedFile, ...files]);
    setFieldValue('files', [...selectedFile, ...files]);

    if (files.length) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const binaryData = reader.result;
        console.log('Binary data:', binaryData);
        setPreviewUrl(reader.result);
        setFileType(files[0].type);
      };

      reader.readAsArrayBuffer(files[0]);
    } else {
      setPreviewUrl(null);
      setFileType(null);
    }
  };

  const handleFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileDeletion = (index) => {
    const updatedFiles = [...selectedFile].filter((_, i) => i !== index);
    setSelectedFile(updatedFiles);
    const previousFile = updatedFiles[index - 1];
    const previousPreviewUrl = previousFile ? URL.createObjectURL(previousFile) : null;
    setPreviewUrl(previousPreviewUrl);
    const previousFileType = previousFile ? previousFile.type : null;
    setFileType(previousFileType);
    setFieldValue('files', updatedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);

    setSelectedFile([...selectedFile, ...files]);
    setFieldValue('files', [...selectedFile, ...files]);

    if (files.length) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setFileType(files[0].type);
    } else {
      setPreviewUrl(null);
      setFileType(null);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <label className="label" htmlFor={id}>
          <span className="label-text text-gray-900 font-medium">
            {labelText}
            <span className="text-red-500 ml-1">{symbols}</span>
          </span>
          <span className="label-text-alt">{labelRightText}</span>
        </label>

        <div
          className={
            errors
              ? `border-4 border-red-500 border-dashed rounded-2xl p-4`
              : `border-4 border-dashed rounded-2xl cursor-pointer p-4`
          }
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="file" className="flex flex-col items-center gap-4 cursor-pointer">
            {!previewUrl ? (
              <>
                <BsCloudUpload className="text-gray-500 w-8 h-8" />
                <div className="">
                  <p className="hover:underline">
                    <span className="font-bold" onClick={handleFileSelection}>
                      Click to upload
                    </span>
                    <span className="text-blue-500 "> or Drag and Drop</span>
                  </p>
                  <p className="text-labels font-semibold text-gray-600 text-center">Max. File Size: 5mb</p>
                </div>
              </>
            ) : (
              <>
                {selectedFile && (
                  <>
                    {!fileType.startsWith('image/') ? (
                      <>
                        {fileType === 'text/csv' && <BsFiletypeCsv className="h-8 w-8" />}
                        {fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && (
                          <BsFiletypePpt className="h-8 w-8" />
                        )}
                        {fileType === 'application/pdf' && <BsFiletypePdf className="h-8 w-8" />}
                        <span className="text-labels">File type: {`${fileType}`}</span>
                      </>
                    ) : (
                      <>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                        <p className="font-semibold italic">{selectedFile[0].name}</p>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            <div>
              <>
                <button type="button" className="btn btn-sm btn-outline text-labels" onClick={handleFileSelection}>
                  {selectedFile.length === 0 ? <IoSearch className="h-4 w-4" /> : <AiOutlineFileAdd className="h-5 w-5" />}
                  {selectedFile.length === 0 ? 'Browse Files' : 'Add more'}
                </button>

                <input
                  type="file"
                  name={name}
                  id="file"
                  ref={fileInputRef}
                  multiple
                  onChange={handleFileChange}
                  onBlur={onBlur}
                  style={{ display: 'none' }}
                />
              </>
            </div>
          </label>
        </div>

        {errors && (
          <p className="label-text-alt text-red-600 flex items-center gap-1 p-1">
            <MdCancel className="h-3 w-3" /> {errors}
          </p>
        )}

        <ul>
          {selectedFile.length > 0 && (
            <>
              {selectedFile.map((file, index) => (
                <li key={index}>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-md px-8 py-3 my-3 flex items-center justify-between">
                    <p>{file && file.name}</p>
                    <span className="cursor-pointer" onClick={() => handleFileDeletion(index)}>
                      <RiDeleteBin5Line className="h-5 w-5 text-red-550" />
                    </span>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default FileUpload;
