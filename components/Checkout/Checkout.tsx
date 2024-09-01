// /components/Checkout/Checkout.tsx

import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartContext';
import { CartItem } from '@/utils/types';
import OrderModal from './OrderModal';
import { motion } from 'framer-motion';

const Checkout: React.FC<{ onClose: Function }> = ({ onClose }) => {
  const { cartItems } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [validDiscountCode, setValidDiscountCode] = useState<string | null>(null);

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.item.price * item.quantity, 0);
  const tax = (total - discountAmount) * 0.1;
  const finalTotal = total - discountAmount + tax;

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyDiscount = () => {
    if (discountCode === validDiscountCode) {
      setDiscountAmount(total * 0.15);
    } else {
      alert('Invalid discount code');
      setDiscountAmount(0);
    }
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cartItems.map(item => ({
        id: item.item.id,
        name: item.item.name,
        price: item.item.price,
        quantity: item.quantity,
      })),
      discount: discountAmount,
      taxes: tax,
      finalAmount: finalTotal,
    };

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderId(data.orderId);
        setOrderDetails(orderData); // Store order details for the modal
        setIsModalOpen(true); // Open the modal
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order');
    }
  };

  useEffect(() => {
    const fetchDiscountCode = async () => {
      try {
        const response = await fetch('/api/admin/generate-discount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: '1' }),
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row p-6 bg-white shadow-lg rounded-lg m-48"
      initial={{ opacity: 0, y: 20 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: 20 }} // Exit state
      transition={{ duration: 0.3 }} // Transition duration
    >
      {/* Left Side: Items and Quantity Breakdown */}
      <div className="w-full md:w-2/3 pr-4">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {cartItems.map(item => (
          <motion.div 
            key={item.item.id} 
            className="flex justify-between items-center mb-2 border-b pb-2"
            initial={{ opacity: 0 }} // Initial state for each item
            animate={{ opacity: 1 }} // Animate to this state
            exit={{ opacity: 0 }} // Exit state
            transition={{ duration: 0.2 }} // Transition duration for items
          >
            <span className="font-semibold">{item.item.name}</span>
            <span className="text-gray-600">${item.item.price.toFixed(2)} x {item.quantity}</span>
            <span className="text-gray-800 font-bold">${(item.item.price * item.quantity).toFixed(2)}</span>
          </motion.div>
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
        {discountAmount > 0 && (
          <div className="flex justify-between font-bold mb-2">
            <span>Discount:</span>
            <span>${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold mb-4">
          <span>Total:</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-8 py-2 rounded hover:bg-green-600"
          >
            Pay Now
          </button>
        </div>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        orderId={orderId || ''}
        orderDetails={orderDetails}
      />
    </motion.div>
  );
};

export default Checkout;