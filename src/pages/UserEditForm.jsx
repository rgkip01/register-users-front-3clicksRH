import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/UserService';
import BackButton from '../components/BackButton';

const UserEditForm = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get('id');

  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('editUserData');
    return storedData ? JSON.parse(storedData) : {};
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData || !userId) {
      alert('Erro ao carregar os dados do usuário.');
      navigate('/usuarios');
    }
  }, [userData, userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(userId, { data: { type: 'users', attributes: userData } });
      localStorage.removeItem('editUserData');
      navigate('/usuarios');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao salvar as alterações. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Salvando alterações...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-purple-700 text-3xl font-bold mb-6 text-center">Editar Usuário</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300"
            />
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              name="document"
              value={userData.document}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300"
            />
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
            <input
              type="date"
              name="date_of_birth"
              value={userData.date_of_birth}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300"
            />
          </div>

          {/* Botões */}
          <div className="md:col-span-2 flex justify-between">
            <BackButton />
            <button
              type="submit"
              className="px-6 py-2 bg-purple-700 text-white rounded-md shadow-md hover:bg-purple-800 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditForm;
