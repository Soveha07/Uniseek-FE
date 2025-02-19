import React from 'react';
import './App.css';
import Routers from './router';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Welcome to My App</h1>
        <p>This text inherits global styles.</p>
      </div>
      <Routers />
    </div>
  );
};
export default App;
