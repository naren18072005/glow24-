
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

// More permissive CORS settings
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Glow24 Organics API', status: 'Server is running correctly' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
