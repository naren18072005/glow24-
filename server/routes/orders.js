
const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');

// In-memory storage for orders (in a real app, this would be a database)
const orders = [];

// POST create a new order
router.post('/', (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate required fields
    if (!orderData.customerName || !orderData.shippingAddress || !orderData.items || !orderData.paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Generate order ID
    const orderId = randomUUID();
    
    // Create new order
    const newOrder = {
      orderId,
      ...orderData,
      orderDate: new Date().toISOString(),
      status: orderData.paymentMethod === 'cod' ? 'pending' : 'paid'
    };
    
    // Save order
    orders.push(newOrder);
    
    // Return order ID
    res.status(201).json({ orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// GET order tracking info
router.get('/:orderId/track', (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find order (in a real app, this would query a database)
    const order = orders.find(o => o.orderId === orderId);
    
    if (!order) {
      // Generate simulated tracking data if order not found
      const now = new Date();
      const estimatedDelivery = new Date(now);
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
      
      return res.json({
        status: "in_transit",
        currentLocation: {
          lat: 11.0168,
          lng: 76.9558
        },
        estimatedDelivery: estimatedDelivery.toISOString(),
        stages: [
          { 
            name: "Order Received", 
            completed: true, 
            timestamp: new Date(now.getTime() - 1000 * 60 * 60).toISOString() 
          },
          { 
            name: "In Production", 
            completed: true, 
            timestamp: new Date(now.getTime() - 1000 * 60 * 30).toISOString() 
          },
          { 
            name: "Dispatched", 
            completed: true, 
            timestamp: now.toISOString() 
          },
          { 
            name: "Out for Delivery", 
            completed: false 
          },
          { 
            name: "Delivered", 
            completed: false 
          }
        ],
        distance: 5.3
      });
    }
    
    // In a real app, we would return actual tracking data
    const now = new Date();
    const orderDate = new Date(order.orderDate);
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
    
    res.json({
      status: order.status === 'paid' ? "in_transit" : "processing",
      currentLocation: {
        lat: 11.0168,
        lng: 76.9558
      },
      estimatedDelivery: estimatedDelivery.toISOString(),
      stages: [
        { 
          name: "Order Received", 
          completed: true, 
          timestamp: orderDate.toISOString() 
        },
        { 
          name: "In Production", 
          completed: order.status === 'paid', 
          timestamp: order.status === 'paid' ? new Date(orderDate.getTime() + 1000 * 60 * 60).toISOString() : undefined
        },
        { 
          name: "Dispatched", 
          completed: false
        },
        { 
          name: "Out for Delivery", 
          completed: false 
        },
        { 
          name: "Delivered", 
          completed: false 
        }
      ],
      distance: 5.3
    });
  } catch (error) {
    console.error('Error tracking order:', error);
    res.status(500).json({ message: 'Failed to track order' });
  }
});

// PUT update order status
router.put('/:orderId/status', (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    // Find order
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update status
    orders[orderIndex].status = status;
    
    res.json({ message: 'Order status updated' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order' });
  }
});

module.exports = router;
