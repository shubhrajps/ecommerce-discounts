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

  if (req.method === 'GET') {
    try {
      const orders = await db.all('SELECT * FROM orders'); // Retrieve all orders
      res.status(200).json(orders); // Send the orders as JSON
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}