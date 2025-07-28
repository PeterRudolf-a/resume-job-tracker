import React from 'react';

const ResumeDetails: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Resume Details</h1>
      <p className="text-gray-700">
        Select a resume from the list to view its full details here.
      </p>
    </div>
  );
};

export default ResumeDetails;
