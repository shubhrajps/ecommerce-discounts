import { CartItem, Item } from "@/utils/types";
import React from "react";

const CartSidebar: React.FC<{ cartItems: CartItem[], onUpdateQuantity: Function, onCheckout: Function }> = 
({ cartItems, onUpdateQuantity, onCheckout }) => {
  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>{item.item.name}</span>
          <span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            {item.quantity}
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </span>
        </div>
      ))}
      <button onClick={()=>onCheckout()} className="bg-green-500">
        Checkout
      </button>
    </div>
  );
};

export default CartSidebar;
