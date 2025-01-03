import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-62 bg-purple-700 text-white fixed top-14 left-0 h-full">
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/cadastro-usuario"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? 'bg-purple-600' : 'hover:bg-purple-600'
                }`
              }
            >
              Cadastro de Usuário
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cadastro-endereco"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? 'bg-purple-600' : 'hover:bg-purple-600'
                }`
              }
            >
              Cadastro de Endereço
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/listagem-usuarios"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? 'bg-purple-600' : 'hover:bg-purple-600'
                }`
              }
            >
              Listagem de Usuários
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
