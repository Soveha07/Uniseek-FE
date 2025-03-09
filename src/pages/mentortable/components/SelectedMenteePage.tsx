import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { sampleSelectedData, SelectedMentee } from '../data/sampleSelectedData';
import './DashboardPage.css'; // Reusing our CSS for common styles

const SelectedMenteePage: React.FC = () => {
  // Ensure that each mentee has an actualTimeOfMeetings value (default to planned if not set)
  const [data, setData] = useState<SelectedMentee[]>(
    sampleSelectedData.map(item => ({
      ...item,
      actualTimeOfMeetings: item.actualTimeOfMeetings || item.timeOfMeetings,
    }))
  );

  // Create dropdown options: numbers 1 to 10 with a cute style
  const meetingOptions = Array.from({ length: 10 }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
    style: { 
      backgroundColor: '#0A66C2', 
      color: 'white', 
      textAlign: 'center',
      borderRadius: '5px'
    }
  }));

  const handlePlannedMeetingChange = (rowId: number, newTime: number) => {
    setData(prevData =>
      prevData.map(item =>
        item.no === rowId ? { ...item, timeOfMeetings: newTime } : item
      )
    );
  };

  const handleActualMeetingChange = (rowId: number, newTime: number) => {
    setData(prevData =>
      prevData.map(item =>
        item.no === rowId ? { ...item, actualTimeOfMeetings: newTime } : item
      )
    );
  };

  // Template for the planned ("# Time of Meetings") column
  const plannedMeetingsTemplate = (rowData: SelectedMentee) => (
    <Dropdown
      options={meetingOptions}
      value={rowData.timeOfMeetings}
      onChange={(e) => handlePlannedMeetingChange(rowData.no, e.value)}
      placeholder="Select 😊"
      style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(247, 242, 242, 0.1)' }}
    />
  );

  // Template for the actual ("Actual Time of Meetings") column
  const actualMeetingsTemplate = (rowData: SelectedMentee) => (
    <Dropdown
      options={meetingOptions}
      value={rowData.actualTimeOfMeetings}
      onChange={(e) => handleActualMeetingChange(rowData.no, e.value)}
      placeholder="Select 😊"
      style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    />
  );

  // Template for the "% Complete" column
  // If planned equals actual, display bold "Complete" with a tick icon;
  // otherwise, show a progress bar whose percentage is computed as (actual/planned)*100.
  const completeTemplate = (rowData: SelectedMentee) => {
    const planned = rowData.timeOfMeetings;
    const actual = rowData.actualTimeOfMeetings;
    
    if (actual === planned) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          Complete <span style={{ marginLeft: '5px' }}>✔️</span>
        </div>
      );
    } else {
      const percentage = (actual / planned) * 100;
      return (
        <ProgressBar
          value={percentage}
          style={{
            height: '15px',
            borderRadius: '10px',
            // border: '2px solid #0A66C2',
            backgroundColor: '#DCE6F1'
          }}
        />
      );
    }
  };

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
          >
            <Column field="no" header="No" style={{ color: 'black' }} />
            <Column field="name" header="Name" style={{ color: 'black' }} />
            <Column field="sex" header="Sex" style={{ color: 'black' }} />
            <Column field="startDate" header="Start Date" style={{ color: 'black' }} />
            <Column field="endDate" header="End Date" style={{ color: 'black' }} />
            <Column header="# Time of Meetings" body={plannedMeetingsTemplate} style={{ color: 'black' }} />
            <Column header="Actual Time of Meetings" body={actualMeetingsTemplate} style={{ color: 'black' }} />
            <Column header="% Complete" body={completeTemplate} style={{ color: "black" }} bodyStyle={{ color: "#0A66C2" }} />
            <Column field="reference" header="Reference" style={{ color: 'black' }} />
          </DataTable>
        </div>
      </div>
  );
};

export default SelectedMenteePage;