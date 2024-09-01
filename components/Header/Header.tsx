import React from 'react';

const Header: React.FC<{ onViewCart: Function }> = ({ onViewCart }) => {
  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl">NeuCommerce</div>
      <button onClick={()=>onViewCart()} className="bg-blue-500 px-4 py-2 rounded">
        View Cart
      </button>
    </header>
  );
};

export default Header;