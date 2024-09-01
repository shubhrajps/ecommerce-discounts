'use client'
import React, { useState } from 'react';
import Header from './Header/Header';
import ItemCard from './ItemCard/ItemCard';
import CartSidebar from './CartSidebar/CartSidebar';
import Checkout from './Checkout/Checkout';
import { Item } from '@/utils/types';
import { items } from '@/assets/assets';

const MainPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const handleAddToCart = (itemId: string) => {
    // Logic to add item to cart
  };

  const handleRemoveFromCart = (itemId: string) => {
    // Logic to remove item from cart
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    // Logic to update item quantity in cart
  };

  const handleCheckout = () => {
    // Logic to handle checkout
  };

  return (
    <div>
      <Header onViewCart={() => setShowCart(true)} />
      <div className="grid grid-cols-6 gap-4 justify-items-center my-8 space-y-4">
        {items.map(item => (
          <ItemCard key={item.id} item={item} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
        ))}
      </div>
      {showCart && (
        <CartSidebar
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      )}
      {/* Checkout component can be rendered conditionally based on the checkout flow */}
    </div>
  );
};

export default MainPage;