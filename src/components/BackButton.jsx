import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/usuarios');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-1/4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center gap-2"
    >
      <FaArrowLeft />
      Voltar
    </button>
  );
};

export default BackButton;
