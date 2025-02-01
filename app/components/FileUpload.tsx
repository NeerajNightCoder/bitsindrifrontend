import React, { useState, useCallback } from 'react';

// Define the props interface (if needed)
interface FileUploadProps {
  onFileUpload: (file: File) => void; // Callback function to handle the uploaded file
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileUpload(file); // Pass the file to the parent component
    }
  };

  // Handle drag over event
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle drag leave event
  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  // Handle file drop event
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      onFileUpload(file); // Pass the file to the parent component
    }
  }, [onFileUpload]);

  return (
    <div
      className={`uploadbox ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput">
        <CloudIcon className="uploadIcon" />
        <h1>Upload a File</h1>
        <p>Click to browse, or drag & drop a file here</p>
      </label>
    </div>
  );
};

// Placeholder for CloudIcon (replace with your actual icon component)
const CloudIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

export default FileUpload;