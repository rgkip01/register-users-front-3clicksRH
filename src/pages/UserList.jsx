import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, searchUsers, deleteUser } from '../services/UserService';
import SearchBar from '../components/SearchBar';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

  const handleSearch = async (query) => {
    try {
      const data = await searchUsers(query);
      setUsers(data);
    } catch (error) {
      alert('Ocorreu um erro ao realizar a busca. Tente novamente.');
    }
  };

  const handleAddAddress = (userId) => {
    navigate(`/cadastro-endereco?user_id=${userId}`);
  };

  const handleEditUser = (userId) => {
    navigate(`/usuarios/${userId}/editar`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir o usuário. Tente novamente.');
      }
    }
  };

  const handleRowClick = (id) => {
    navigate(`/usuarios/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-[80%]">
        <div className="flex items-center justify-between mt-14 mb-6">
          <h2 className="text-purple-700 text-3xl font-bold">Listagem de Usuários</h2>
          <div className="w-1/3">
            <SearchBar onSearch={handleSearch} suggestions={users.map((user) => user.attributes.name)} />
          </div>
        </div>

        {/* Usuários */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-lg border border-gray-300">
            <thead>
              <tr className="bg-purple-700 text-white text-left">
                <th className="px-6 py-3 min-w-[200px]">Nome</th>
                <th className="px-6 py-3 min-w-[250px]">Email</th>
                <th className="px-6 py-3 min-w-[150px]">CPF</th>
                <th className="px-6 py-3 min-w-[250px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleRowClick(user.id)}
                    className="border-b cursor-pointer hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">{user.attributes.name}</td>
                    <td className="px-6 py-4">{user.attributes.email}</td>
                    <td className="px-6 py-4">{user.attributes.document}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddAddress(user.id);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                      >
                        Adicionar Endereço
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditUser(user.id);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none flex items-center gap-1"
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none flex items-center gap-1"
                      >
                        <FaTrash /> Excluir
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
