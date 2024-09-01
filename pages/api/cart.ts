import { NextApiRequest, NextApiResponse } from 'next';

let cart: { [key: string]: { itemId: string; quantity: number } } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { action, itemId, quantity } = req.body;

    if (action === 'add') {
      // Add item to cart
      if (!cart[itemId]) {
        cart[itemId] = { itemId, quantity: 0 };
      }
      cart[itemId].quantity += quantity;

      return res.status(200).json({ success: true, cart: Object.values(cart) });
    } else if (action === 'remove') {
      // Remove item from cart
      delete cart[itemId];
      return res.status(200).json({ success: true, cart: Object.values(cart) });
    }

    return res.status(400).json({ success: false, message: 'Invalid action' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}