import React from 'react';
import { DataRow as DataRowType } from '../data/sampleData';

type DataRowProps = {
  rowData: DataRowType;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
};

export const StatusCell: React.FC<DataRowProps> = ({ rowData, onAccept, onDecline }) => {
  if (rowData.status === 'Accepted') {
    return <span style={{ color: '#83941F', fontWeight: 'bold' }}>Accepted</span>;
  } else if (rowData.status === 'Declined') {
    return <span style={{ color: '#B24020', fontWeight: 'bold' }}>Declined</span>;
  }

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <button
        style={{
          backgroundColor: '#83941F',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => onAccept(rowData.no)}
      >
        Accept
      </button>
      <button
        style={{
          backgroundColor: '#B24020',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => onDecline(rowData.no)}
      >
        Decline
      </button>
    </div>
  );
};

export default StatusCell;