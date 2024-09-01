'use client'
import React, { useState } from 'react';
import Header from './Header/Header';
import ItemCard from './ItemCard/ItemCard';
import CartSidebar from './CartSidebar/CartSidebar';
import Checkout from './Checkout/Checkout';
import { Item } from '@/utils/types';
import { items } from '@/assets/assets';
import { useCart } from './Context/CartContext';

const MainPage = () => {
  const [showCart, setShowCart] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    // Logic to handle checkout
  };

  return (
    <div>
      <Header onViewCart={() => setShowCart(true)} />
      <div className="grid grid-cols-6 gap-4 justify-items-center my-8 space-y-4">
        {items.map(item => (
          <ItemCard key={item.id} item={item} onAddToCart={()=> addToCart(item)} onRemoveFromCart={()=>removeFromCart(item.id)} />
        ))}
      </div>
      {showCart && (
        <CartSidebar
          onClose={()=> setShowCart(false)}
        />
      )}
      {/* Checkout component can be rendered conditionally based on the checkout flow */}
    </div>
  );
};

export default MainPage;