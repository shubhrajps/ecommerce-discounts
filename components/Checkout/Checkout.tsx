import { CartItem } from '@/utils/types';
import React from 'react';

const Checkout: React.FC<{ cartItems: CartItem[], total: string, discountCode: string, onPlaceOrder: Function }> = ({ cartItems, total, discountCode, onPlaceOrder }) => {
  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.map(item => (
        <div key={item.item.id}>
          <span>{item.item.name}</span>
          <span>${item.item.price}</span>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <input type="text" placeholder="Discount Code" value={discountCode} />
      <button onClick={()=>onPlaceOrder()}>Place Order</button>
    </div>
  );
};

export default Checkout;