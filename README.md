# E-commerce Discounts

This project is a simple e-commerce application that allows users to place orders and generates discount codes for every nth order (specifically for the 3rd, 6th, 9th, etc.). The application uses Next.js for the frontend and SQLite for data storage.

## Features

- Place orders and store them in a SQLite database.
- Generate unique discount codes for every 3rd order.
- View all orders and their details.
- Simple API endpoints for order creation and discount code generation.

## Technologies Used

- **Frontend**: Next.js (React framework)
- **Backend**: Next.js API routes
- **Database**: SQLite
- **Styling**: Tailwind CSS (optional, if you decide to use it)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- SQLite

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/ecommerce-discounts.git
   cd ecommerce-discounts

2. **Install dependencies**:
    ```bash
    npm install

3. **Create the database**:
    Run the following command to create the SQLite database and the necessary tables:
    ```bash
    node --loader ts-node/esm utils/init-db.ts

4. **Running the Application**:
    To start the development server, run:
    ```bash
    npm run dev

### License
- This project is licensed under the MIT License - see the LICENSE file for details.