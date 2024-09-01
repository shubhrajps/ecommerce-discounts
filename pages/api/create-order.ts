// pages/api/create-order.ts

import { OrderData } from '@/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';

let orders: { [key: string]: OrderData } = {}; // In-memory storage for orders

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { items, discount, taxes, finalAmount }: OrderData = req.body;

    // Generate a unique order ID
    const orderId = `ORDER-${Object.keys(orders).length + 1}`;

    // Save the order data
    orders[orderId] = { items, discount, taxes, finalAmount };

    return res.status(200).json({ orderId });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}