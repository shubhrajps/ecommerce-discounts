// /components/Checkout/Checkout.tsx

import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartContext';
import { CartItem } from '@/utils/types';

const Checkout: React.FC = () => {
  const { cartItems } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [validDiscountCode, setValidDiscountCode] = useState<string | null>(null);

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.item.price * item.quantity, 0);
  const tax = (total - discountAmount) * 0.1;
  const finalTotal = total - discountAmount + tax;

  const handleApplyDiscount = () => {
    if (discountCode === validDiscountCode) {
      setDiscountAmount(total * 0.15);
      
    } else {
      alert('Invalid discount code');
    }
  };

  const handlePlaceOrder = () => {
    // Logic to place the order
    alert('Order placed successfully!');
  };

  const handleCancelOrder = () => {
    // Logic to cancel the order
    alert('Order cancelled');
  };

  // Fetch the discount code when the component mounts
  useEffect(() => {
    const fetchDiscountCode = async () => {
      try {
        const response = await fetch('/api/admin/generate-discount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: '1' }), // Replace with actual order ID logic
        });

        if (response.ok) {
          const data = await response.json();
          setValidDiscountCode(data.discountCode); 
          setDiscountCode(data.discountCode);
        } else {
          console.error('No discount code generated');
        }
      } catch (error) {
        console.error('Error fetching discount code:', error);
      }
    };

    fetchDiscountCode();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-6 bg-white shadow-lg rounded-lg">
      {/* Left Side: Items and Quantity Breakdown */}
      <div className="w-full md:w-2/3 pr-4">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {cartItems.map(item => (
          <div key={item.item.id} className="flex justify-between items-center mb-2 border-b pb-2">
            <span className="font-semibold">{item.item.name}</span>
            <span className="text-gray-600">${item.item.price.toFixed(2)} x {item.quantity}</span>
            <span className="text-gray-800 font-bold">${(item.item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Right Side: Order Summary */}
      <div className="w-full md:w-1/3 pl-4">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Discount Code:</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border rounded-l-md p-2 flex-grow"
            />
            <button
              onClick={handleApplyDiscount}
              className="bg-blue-500 text-white rounded-r-md px-4 hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="flex justify-between font-bold mb-2">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discountAmount>0 && <div className="flex justify-between font-bold mb-2">
          <span>Discount:</span>
          <span>${discountAmount.toFixed(2)}</span>
        </div>}
        <div className="flex justify-between font-bold mb-4">
          <span>Total:</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </button>
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;