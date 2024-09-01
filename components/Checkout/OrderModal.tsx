// /components/OrderModal.tsx

import React from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderDetails: {
    items: { id: string; name: string; price: number; quantity: number }[];
    discount: number;
    taxes: number;
    finalAmount: number;
  } | null;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, orderId, orderDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded w-1/2 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Order successfully placed</h2>
        <p className="mb-2 font-semibold">Order ID: {orderId}</p>
        <h3 className="font-semibold mb-2">Items:</h3>
        <ul className="mb-4">
          {orderDetails?.items.map(item => (
            <li key={item.id} className='flex justify-between'>
              <span>{item.name}</span>
              <span>${item.price} x {item.quantity}</span>
            </li>
          ))}
        </ul>
        <p className="font-semibold text-right">Discount: -${orderDetails?.discount.toFixed(2)}</p>
        <p className="font-semibold text-right">Taxes: +${orderDetails?.taxes.toFixed(2)}</p>
        <p className="font-bold text-right">Total Amount: ${orderDetails?.finalAmount.toFixed(2)}</p>
        <div className="mt-4">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;