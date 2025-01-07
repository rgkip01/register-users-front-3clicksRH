import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import UserForm from './pages/UserForm';
import UserList from './pages/UserList';
import UserShow from './pages/UserShow';
import UserEditForm from './pages/UserEditForm';
import AddressForm from './pages/AddressForm';
import EditAddressForm from './pages/EditAddressForm';
import './index.css';

// Definindo minhas rotas usando createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'cadastro-usuario', element: <UserForm /> },
      { path: 'cadastro-endereco', element: <AddressForm /> },
      { path: 'editar-endereco', element: <EditAddressForm />},
      { path: 'editar-usuario', element: <UserEditForm />},
      { path: 'usuarios', element: <UserList /> },
      { path: 'usuarios/:id', element: <UserShow /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
