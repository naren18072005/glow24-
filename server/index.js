
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import route handlers
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Glow24 Organics API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
