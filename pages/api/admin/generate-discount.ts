import { NextApiRequest, NextApiResponse } from 'next';

let discountCodes: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { orderId } = req.body;

    // Generate a discount code for every nth order (e.g., every 5th order)
    if (orderId && (discountCodes.length + 1) % 5 === 0) {
      const discountCode = `DISCOUNT-${discountCodes.length + 1}`;
      discountCodes.push(discountCode);
      return res.status(200).json({ success: true, discountCode });
    }

    return res.status(400).json({ success: false, message: 'No discount code generated' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}