import { OrderData } from '@/utils/types';
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
  const db = await openDb();

  if (req.method === 'POST') {
    const { items, discount, taxes, finalAmount }: OrderData = req.body;

    // Insert the order data into the database
    const result = await db.run('INSERT INTO orders (items, discount, taxes, finalAmount) VALUES (?, ?, ?, ?)', 
      [JSON.stringify(items), discount, taxes, finalAmount]);

    return res.status(200).json({ orderId: result.lastID }); // Return the ID of the newly created order
  }

  return res.status(405).json({ message: 'Method not allowed' });
}