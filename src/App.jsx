import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  );
}

export default App;
