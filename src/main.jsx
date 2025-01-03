import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import UserForm from './pages/UserForm';
import AddressForm from './pages/AddressForm';
import './index.css';

// Definindo minhas rotas usando createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'cadastro-usuario', element: <UserForm /> },
      { path: 'cadastro-endereco', element: <AddressForm /> },
      { path: 'listagem-usuarios', element: '' },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
