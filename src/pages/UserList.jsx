import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao carregar a listagem de usuários. Tente novamente mais tarde.');
      }
    };

    fetchUsers();
  }, []);

  const handleAddAddress = (userId) => {
    navigate(`/cadastro-endereco?user_id=${userId}`);
  };

  const handleRowClick = (id) => {
    navigate(`/usuarios/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-[80%]">
        <h2 className="text-purple-700 text-3xl font-bold mt-14 mb-6 text-center">Listagem de Usuários</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-lg border border-gray-300">
            <thead>
              <tr className="bg-purple-700 text-white text-left">
                <th className="px-6 py-3 min-w-[200px]">Nome</th>
                <th className="px-6 py-3 min-w-[250px]">Email</th>
                <th className="px-6 py-3 min-w-[150px]">CPF</th>
                <th className="px-6 py-3 min-w-[180px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                   <tr>
                   <td colSpan="4" className="text-center py-6 text-gray-500">
                     Nenhum usuário encontrado.
                   </td>
                 </tr> 
              ): (
                users.map((user) => (
                  <tr key={user.id} onClick={() => handleRowClick(user.id)} className="border-b cursor-pointer hover:bg-gray-100">
                    <td className="px-6 py-4">{user.attributes.name}</td>
                    <td className="px-6 py-4">{user.attributes.email}</td>
                    <td className="px-6 py-4">{user.attributes.document}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddAddress(user.id)
                        }} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                      >
                        Adicionar Endereço
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
