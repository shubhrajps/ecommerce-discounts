'use client'
import React, { useState } from 'react';
import Header from './Header/Header';
import ItemCard from './ItemCard/ItemCard';
import CartSidebar from './CartSidebar/CartSidebar';
import Checkout from './Checkout/Checkout';
import { items } from '@/assets/assets';
import { useCart } from './Context/CartContext';

const MainPage = () => {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const { cartItems, addToCart, removeFromCart } = useCart();

  return (
    <div>
      <Header onViewCart={() => setShowCart(true)} goToHome={()=>{ setShowCheckout(false); setShowCart(false); }} />
      {!showCheckout?<>
        <div className="grid grid-cols-6 gap-4 justify-items-center my-8 space-y-4">
          {items.map(item => (
            <ItemCard key={item.id} item={item} onAddToCart={()=> addToCart(item)} onRemoveFromCart={()=>removeFromCart(item.id)} />
          ))}
        </div>
        {showCart && (
          <CartSidebar
            onClose={()=> setShowCart(false)}
            onCheckout={()=> setShowCheckout(true)}
          />
        )}
      </>:
      <>
        {cartItems.length > 0 && (
          <Checkout />
        )}
      </>}
    </div>
  );
};

export default MainPage;