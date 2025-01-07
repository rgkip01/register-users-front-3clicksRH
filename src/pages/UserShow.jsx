import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/UserService';
import { updateAddress, deleteAddress } from '../services/AddressService';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Biblioteca de ícones

const Usershow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(id);
        setUserData(user.data.attributes);

        const completeAddresses = user.included
          ?.filter((item) => item.type === 'address')
          .map((address) => ({
            id: address.id,
            ...address.attributes,
          }));

        setAddresses(completeAddresses || []);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        alert('Erro ao carregar os dados do usuário.');
        navigate('/usuarios');
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    setAddresses((prev) =>
      prev.map((address, i) =>
        i === index ? { ...address, [name]: value } : address
      )
    );
  };

  const handleRemoveAddress = async (userId, addressId) => {
    if (window.confirm('Tem certeza que deseja remover este endereço?')) {
      try {
        await deleteAddress(userId, addressId);
        setAddresses((prev) => prev.filter((address) => address.id !== addressId));
      } catch (error) {
        console.error('Erro ao remover endereço:', error);
        alert('Erro ao remover o endereço. Tente novamente.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await updateUser(id, { data: { type: 'users', attributes: userData } });

      alert('Dados atualizados com sucesso!');
      navigate('/usuarios');
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      alert('Erro ao salvar as alterações. Tente novamente.');
    }
  };
  

  if (loading || !userData) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-purple-700 text-3xl font-bold mb-6 text-center">Detalhes do Usuário</h2>
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

          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Endereços</h3>
            {addresses.map((address, index) => (
              <div key={address.id} className="mb-4 p-4 border rounded-md relative">
                {/* Ícone de lápis para editar endereço */}
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('editingAddress', JSON.stringify(address));
                    navigate(`/editar-endereco?userId=${id}&addressId=${address.id}`)
                  }}
                  className="absolute top-2 right-10 text-blue-600 hover:text-blue-800"
                  title="Editar endereço"
                >
                  <FaEdit size={20} />
                </button>
                {/* Ícone de lixeira */}
                <button
                  type="button"
                  onClick={() => handleRemoveAddress(id, address.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  title="Remover endereço"
                >
                  <FaTrash size={20} />
                </button>

                {/* Rua */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street || ''}
                    readOnly
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300 bg-gray-200 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Cidade */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city || ''}
                    readOnly
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300 bg-gray-200 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Estado */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state || ''}
                    readOnly
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300 bg-gray-200 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* CEP */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                  <input
                    type="text"
                    name="zip_code"
                    value={address.zip_code || ''}
                    readOnly
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300 bg-gray-200 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* País */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                  <input
                    type="text"
                    name="country"
                    value={address.country || ''}
                    readOnly
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300 bg-gray-200 text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botão de Salvar */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Usershow;
