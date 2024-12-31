import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';

function App() {

  return (
    <>
     <Header />
     <div className='mt-16'>
        <AppRoutes />
     </div>
    </>
  )
}

export default App
