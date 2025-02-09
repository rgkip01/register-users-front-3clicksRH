import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createAddress } from '../services/AddressService';
import BackButton from '../components/BackButton';

const AddressForm = () => {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    complement: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id'); // Obtém o user_id da query string
  
  // Validações com Yup
  const validationSchema = Yup.object().shape({
    street: Yup.string().required('A rua é obrigatória.'),
    city: Yup.string().required('A cidade é obrigatória.'),
    state: Yup.string().required('O estado é obrigatório.'),
    zipCode: Yup.string()
      .matches(/^\d{5}-?\d{3}$/, 'O CEP deve estar no formato 00000-000.')
      .required('O CEP é obrigatório.'),
    country: Yup.string().required('O país é obrigatório.'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await validationSchema.validate(formData, { abortEarly: false });
  
      if (!userId) {
        alert('Usuário não identificado. Não é possível cadastrar o endereço.');
        return;
      }
  
      await createAddress(userId, formData); // Chamando o serviço com userId e formData
      navigate(`/usuarios/${userId}`);
      alert('Endereço cadastrado com sucesso!');
    } catch (validationErrors) {
      if (validationErrors.inner) {
        const formattedErrors = {};
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error('Erro ao cadastrar endereço:', validationErrors);
        alert('Erro ao cadastrar endereço. Tente novamente.');
      }
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-purple-700 text-3xl font-bold mb-6 text-center">
          Cadastro de Endereço
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
              value={formData.street}
              onChange={handleChange}
              placeholder="Digite a rua"
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
              value={formData.city}
              onChange={handleChange}
              placeholder="Digite a cidade"
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
              value={formData.state}
              onChange={handleChange}
              placeholder="Digite o estado"
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
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Digite o CEP"
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.zipCode ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
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
              value={formData.country}
              onChange={handleChange}
              placeholder="Digite o país"
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
              value={formData.complement}
              onChange={handleChange}
              placeholder="Digite o complemento"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 border-gray-300"
            />
          </div>

          {/* Botão de Enviar */}
          <div className="md:col-span-2 flex justify-center gap-4">
            <BackButton />

            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Cadastrar Endereço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
