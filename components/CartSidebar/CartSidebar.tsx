// /components/CartSidebar/CartSidebar.tsx

import React from 'react';
import { CartItem } from '@/utils/types';
import { useCart } from '../Context/CartContext';

const CartSidebar: React.FC<{ onClose: Function }> = ({ onClose }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={item.item.thumbnail}
                  alt={item.item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{item.item.name}</h3>
                  <p className="text-gray-500">${item.item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => removeFromCart(item.item.id)}
                >
                  &times;
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.item.id, parseInt(e.target.value))}
                  className="border px-2 py-1 rounded w-16"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <button
          className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => onClose()}
        >
          Close
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;