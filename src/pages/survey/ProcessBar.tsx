import React from 'react';

interface ProcessBarProps {
  progress: number;
}

const ProcessBar: React.FC<ProcessBarProps> = ({ progress }) => {
  return (
    <div className="survey-progress-bar">
      <div
        className="survey-progress-bar-fill"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProcessBar;