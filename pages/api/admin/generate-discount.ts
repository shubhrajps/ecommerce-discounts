import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbFilePath = './database/orders.db'; // Path to your SQLite database file

async function openDb() {
  return open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID is required' });
    }

    try {
      const db = await openDb();
      const totalOrders = await db.get('SELECT COUNT(*) as count FROM orders'); // Get the total number of orders
      const orderCount = totalOrders.count;

      // Generate a discount code for every 3rd order
      if (orderCount % 3 === 0) {
        const discountCode = `NEUDISC${orderCount}`;
        // Optionally, you can save the discount code to a database or a file if needed
        return res.status(200).json({ success: true, discountCode });
      }

      return res.status(400).json({ success: false, message: 'No discount code generated' });
    } catch (error) {
      console.error('Error fetching order count:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}