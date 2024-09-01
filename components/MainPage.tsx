// /components/MainPage.tsx

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header/Header';
import ItemCard from './ItemCard/ItemCard';
import CartSidebar from './CartSidebar/CartSidebar';
import Checkout from './Checkout/Checkout';
import { items } from '@/assets/assets';
import { useCart } from './Context/CartContext';

const MainPage = () => {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const { cartItems } = useCart();

  return (
    <div>
      <Header 
        onViewCart={() => setShowCart(true)} 
        goToHome={() => { 
          setShowCheckout(false); 
          setShowCart(false); 
        }} 
      />
      
      {!showCheckout ? (
        <>
          <motion.div 
            className="grid mx-8 my-16 sm:mx-48 lg:mx-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 justify-items-center"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.3 }} 
          >
            {items.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
              />
            ))}
          </motion.div>

          {showCart && (
            <motion.div
              initial={{ opacity: 0, x: 300 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 300 }} 
              transition={{ duration: 0.3 }} 
            >
              <CartSidebar
                onClose={() => setShowCart(false)}
                onCheckout={() => setShowCheckout(true)}
              />
            </motion.div>
          )}
        </>
      ) : (
        <>
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -300 }} 
              transition={{ duration: 0.3 }} 
            >
              <Checkout />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MainPage;