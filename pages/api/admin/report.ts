import { NextApiRequest, NextApiResponse } from 'next';

let totalItemsPurchased = 100;
let totalPurchaseAmount = 5000;
let discountCodes: string[] = ['DISCOUNT-1', 'DISCOUNT-2'];
let totalDiscountAmount = 200;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({
      totalItemsPurchased,
      totalPurchaseAmount,
      discountCodes,
      totalDiscountAmount,
    });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}