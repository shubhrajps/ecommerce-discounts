import sqlite3 from 'sqlite3';
import { open as openDb } from 'sqlite';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'database', 'orders.db');

async function createDatabase() {
  const db = await openDb({ 
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  // Create the orders table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      items TEXT,
      discount REAL,
      taxes REAL,
      finalAmount REAL
    )
  `);

  console.log('Database and table created successfully!');
  await db.close();
}

createDatabase().catch(error => {
  console.error('Error creating database:', error);
});