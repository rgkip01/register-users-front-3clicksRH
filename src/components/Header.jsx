import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-purple-700 w-full text-white p-4 shadow-sm fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">3ClicksRH</h1>
        <nav>
          <Link to="/users" className="mr-4">usuários</Link>
          <Link to="/addresses" className="mr-4">endereços</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;