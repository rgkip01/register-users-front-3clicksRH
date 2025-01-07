import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateAddress } from '../services/AddressService';

const EditAddressForm = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [errors, setErrors] = useState({});

  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');
  const addressId = params.get('addressId');

  useEffect(() => {
    const storedAddress = localStorage.getItem('editingAddress');

    if (storedAddress) {
      setAddress(JSON.parse(storedAddress)); 
    } else {
      alert('Nenhum endereço encontrado para edição.');
      navigate(`/usuarios/${userId}`);
    }
  }, [userId, addressId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      await updateAddress(userId, addressId, { data: { type: 'addresses', attributes: address } });
      
      localStorage.removeItem('editingAddress');

      alert('Endereço atualizado com sucesso!');
      navigate(`/usuarios/${userId}`);
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      alert('Erro ao salvar as alterações. Tente novamente.');
    }
  };

  if (!address) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-purple-700 text-3xl font-bold mb-6 text-center">
          Editar de Endereço
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Rua */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rua
            </label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.street ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          {/* CEP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CEP
            </label>
            <input
              type="text"
              name="zip_code"
              value={address.zip_code}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.zip_code ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.zip_code && (
              <p className="text-red-500 text-sm mt-1">{errors.zip_code}</p>
            )}
          </div>

          {/* País */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País
            </label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Complemento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complemento
            </label>
            <input
              type="text"
              name="complement"
              value={address.complement}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300"
            />
          </div>

          {/* Botão de Enviar */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Salvar Alteração
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressForm;