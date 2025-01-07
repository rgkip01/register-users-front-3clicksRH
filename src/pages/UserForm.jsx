import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../services/UserService";
import BackButton from '../components/BackButton';
import  {formatDocument } from '../helpers/formatDocument';

const UserForm = ({ onUserCreated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório."),
    email: Yup.string()
      .email("O e-mail não é válido.")
      .required("O e-mail é obrigatório."),
    document: Yup.string()
      .matches(/^\d{11}$/, "O CPF deve conter 11 dígitos.")
      .required("O CPF é obrigatório."),
    dateOfBirth: Yup.string().required("A data de nascimento é obrigatória."),
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

      const user = await createUser(formData);

      alert("Usuário cadastrado com sucesso!");
      console.log("Usuário cadastrado:", user);
      navigate('/usuarios');
      if (onUserCreated) {
        onUserCreated(user.id);
      }

      setFormData({ name: "", email: "", document: "", dateOfBirth: "" });
      setErrors({});
    } catch (validationErrors) {

      if (validationErrors.inner) {
        const formattedErrors = {};

        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });

        setErrors(formattedErrors);
      } else {
        console.error("Erro ao cadastrar usuário:", validationErrors);
        alert("Erro ao cadastrar usuário.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-purple-700 text-3xl font-bold mb-6 text-center">
          Cadastro de Usuários
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF
            </label>
            <input
              type="text"
              name="document"
              value={formatDocument(formData.document)}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.document ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.document && (
              <p className="text-red-500 text-sm mt-1">{errors.document}</p>
            )}
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-600 ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Botão de Enviar */}
          <div className="md:col-span-2 flex justify-center gap-4">
            <BackButton />

            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
