import React, { useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Header from './Header';
import Sidebar from './Sidebar';

const ComicReader = ({ comicPath }) => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-container">
        <div className="comic-reader-header">
          <Header />
        </div>
        <div className="comic-reader-content">
          <div className="comic-reader-pdf">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <Viewer fileUrl={`http://localhost:3001${comicPath}`} />
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicReader;
