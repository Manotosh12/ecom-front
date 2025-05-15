import './index.css'; 
import React from 'react';
import UpperNavbar from './components/UpperNavbar';


const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <UpperNavbar />
      <main className="p-4">
        <h1 className="text-2xl">Welcome to the Store</h1>
        {/* Add product listing or content here */}
      </main>
      
    </div>
  );
};


export default App;
