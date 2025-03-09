// src/components/DashboardTabs.tsx
import React, { useState } from 'react';
import DashboardPage from './DashboardPage';
import SelectedMenteePage from './SelectedMenteePage';
import { Button } from 'primereact/button';

const DashboardTabs: React.FC = () => {
  const [activePage, setActivePage] = useState('DashboardPage');

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
        }}
      >
        
        <div>
          <Button
            label="Pending"
            icon="pi pi-file-export"
            className="p-button-success"
            style={{ marginRight: '8px', background: '#0A66C2' }}
            onClick={() => setActivePage('DashboardPage')}
          />
          <Button
            label="Selected Mentee"
            icon="pi pi-plus"
            className="p-button-info"
            style={{ marginRight: '8px', background: '#0A66C2' }}
            onClick={() => setActivePage('SelectedMenteePage')}
          />
        </div>
      </div>

      {activePage === 'DashboardPage' && <DashboardPage />}
      {activePage === 'SelectedMenteePage' && <SelectedMenteePage />}
    </div>
  );
};

export default DashboardTabs;