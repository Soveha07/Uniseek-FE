import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import StatusCell from './DataRow';
import { sampleData, DataRow } from '../data/sampleData';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DataRow[]>(sampleData);

  const handleAccept = (rowId: number) => {
    alert('Success to accept');
    setData(prevData =>
      prevData.map(item =>
        item.no === rowId ? { ...item, status: 'Accepted' } : item
      )
    );
  };

  const handleDecline = (rowId: number) => {
    alert('You decline the booking');
    setData(prevData =>
      prevData.map(item =>
        item.no === rowId ? { ...item, status: 'Declined' } : item
      )
    );
  };

  const statusBodyTemplate = (rowData: DataRow) => (
    <StatusCell
      rowData={rowData}
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );

  // Apply a CSS class for declined rows to strike-through their text.
  const rowClassName = (rowData: DataRow) => (rowData.status === 'Declined' ? 'declined-row' : '');

  return (
    <div
      style={{
        backgroundColor: '#FDFAF5',
        width: '100vw',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          border: '1px solid gray',
          backgroundColor: 'white',
          boxSizing: 'border-box',
          padding: '10px',
          marginTop: '20px',
        }}
      >
        <DataTable
          value={data}
          responsiveLayout="scroll"
          className="p-datatable-gridlines"
          rowClassName={rowClassName}
        >
          <Column field="no" header="No" style={{ color: 'black' }} />
          <Column field="name" header="Name" style={{ color: 'black' }} />
          <Column field="sex" header="Sex" style={{ color: 'black' }} />
          <Column field="bookingDate" header="Booking Date" style={{ color: 'black' }} />
          <Column field="time" header="Time" style={{ color: 'black' }} />
          <Column field="profile" header="Profile" style={{ color: 'black' }} />
          <Column header="Status" body={statusBodyTemplate} style={{ color: 'black' }} />
        </DataTable>
      </div>
    </div>
  );
};

export default DashboardPage;