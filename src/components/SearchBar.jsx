import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Ícone de lupa */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <FaSearch />
      </span>

      {/* Campo de entrada */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar usuários..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
    </div>
  );
};

export default SearchBar;
