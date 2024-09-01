import { CartItem } from '@/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';

const validDiscountCodes = ['SAVE10'];
const discountAmount = 10;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cart, discountCode } = req.body;

    // Calculate total price
    const total = cart.reduce((sum: number, item: CartItem) => sum + item.item.price * item.quantity, 0);

    let discountApplied = 0;

    // Validate discount code
    if (discountCode && validDiscountCodes.includes(discountCode)) {
      discountApplied = (total * discountAmount) / 100;
    }

    const finalTotal = total - discountApplied;

    return res.status(200).json({ success: true, total: finalTotal, discountApplied });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}