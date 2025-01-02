import React, { useState } from "react";

const UserForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados', formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Usuários</h2>
      <hr />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            className="mt-1 block w-full p-2 border rounded-md" 
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;