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
  const [showCheckout, setShowCheckout] = useState(false);

  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    // Logic to handle checkout
  };

  return (
    <div>
      <Header onViewCart={() => setShowCart(true)} />
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
          <Checkout
            cartItems={cartItems}
            total={cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0).toFixed(2)}
            discountCode={discountCode}
            onPlaceOrder={handleCheckout}
          />
        )}
      </>}
    </div>
  );
};

export default MainPage;