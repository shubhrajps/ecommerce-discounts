import React from 'react';

const Header: React.FC<{ onViewCart: Function, goToHome: Function }> = ({ onViewCart, goToHome }) => {
  return (
    <header className="flex justify-between px-8 py-4 bg-gray-800 text-white">
      <p onClick={()=>goToHome()} className="text-xl cursor-pointer font-bold self-center">NeuCommerce</p>
      <button onClick={()=>onViewCart()} className="text-white border-2 px-4 py-2 rounded">
        View Cart
      </button>
    </header>
  );
};

export default Header;