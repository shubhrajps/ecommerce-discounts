'use client'
import React, { useState } from 'react';
import Header from './Header/Header';
import ItemCard from './ItemCard/ItemCard';
import CartSidebar from './CartSidebar/CartSidebar';
import Checkout from './Checkout/Checkout';
import { Item } from '@/utils/types';

const items: Item[] = [
  // Sample items
  { id: '1', name: 'Item 1', price: 10, thumbnail: '/images/item1.jpg' },
  { id: '2', name: 'Item 2', price: 22, thumbnail: '/images/item2.jpg' },
  { id: '3', name: 'Item 3', price: 11, thumbnail: '/images/item1.jpg' },
  { id: '4', name: 'Item 4', price: 21, thumbnail: '/images/item2.jpg' },
  { id: '5', name: 'Item 5', price: 40, thumbnail: '/images/item1.jpg' },
  { id: '6', name: 'Item 6', price: 78, thumbnail: '/images/item2.jpg' },
  { id: '7', name: 'Item 7', price: 80, thumbnail: '/images/item1.jpg' },
  { id: '8', name: 'Item 8', price: 32, thumbnail: '/images/item2.jpg' },
  { id: '9', name: 'Item 9', price: 53, thumbnail: '/images/item1.jpg' },
  { id: '10', name: 'Item 10', price: 90, thumbnail: '/images/item2.jpg' },
  { id: '11', name: 'Item 11', price: 89, thumbnail: '/images/item1.jpg' },
  { id: '12', name: 'Item 12', price: 91, thumbnail: '/images/item2.jpg' },
];

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
      <div className="grid grid-cols-3 gap-4">
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