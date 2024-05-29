import React, { useState } from 'react';
import sampleResume from '../../../assets/Theo.pdf';
import Button from '../../../components/button';
import { ButtonState } from '../../../components/button/enum';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './modal.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
const ViewResumeModalBody = ({ onClick }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const handleDownload = () => {
    // Create a new anchor element
    const anchor = document.createElement('a');
    // Set the href attribute to the URL of the sample resume
    anchor.href = sampleResume;
    // Set the download attribute to specify the filename when downloaded
    anchor.download = 'resume.pdf';
    // Programmatically click the anchor element to trigger the download
    anchor.click();
  };

  return (
    <div className="">
      <div className="pdf-container">
        <Document file={sampleResume}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="button-container">
        <Button value={'Cancel'} variant={ButtonState.DarkOutline} className="btn btn-ghost" onClick={onClick} />
        <Button variant={ButtonState.SAVE} value={'Download'} onClick={handleDownload} />
      </div>
    </div>
  );
};

export default ViewResumeModalBody;
