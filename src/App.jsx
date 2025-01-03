import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6 ml-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
