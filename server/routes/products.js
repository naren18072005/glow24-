
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');

// Sample product data as fallback if MongoDB connection fails
const fallbackProducts = [
  {
    id: 1,
    name: "Hair Oil",
    description: "Nourishing hair oil that strengthens hair follicles and promotes healthy growth.",
    price: 199,
    image: "/lovable-uploads/666e7309-d5d2-456a-ba0a-2bd5e0db41f6.png",
    isBestSeller: true,
    category: 'hair-care',
    stock: "In Stock"
  },
  {
    id: 2,
    name: "Rosemary Spray",
    description: "Refreshing rosemary spray that stimulates the scalp and adds shine to hair.",
    price: 150,
    image: "/lovable-uploads/8b6970d3-aa7a-4b17-b67b-3b06dd0b3383.png",
    category: 'hair-care',
    stock: "In Stock"
  }
];

// GET all products
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    // Try to connect to MongoDB and fetch products
    const db = await connectToDatabase();
    console.log('Successfully connected to database');
    
    const collection = db.collection('products');
    console.log('Accessing products collection');
    
    // Only fetch hair care products
    const products = await collection.find({ category: 'hair-care' }).toArray();
    
    console.log(`Fetched ${products.length} hair care products from MongoDB Atlas`);
    
    if (products.length === 0) {
      console.log('No hair care products found in database. Using fallback data');
      return res.json(fallbackProducts);
    }
    
    // Adding artificial delay to simulate network latency
    setTimeout(() => {
      res.json(products);
    }, 300);
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error.message);
    
    // Return fallback data in case of error
    console.log('Using fallback hair care product data');
    res.json(fallbackProducts);
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');
    
    // If id is a valid ObjectId, use it directly, otherwise try to match by numeric id
    let product;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const { ObjectId } = require('mongodb');
      product = await collection.findOne({ _id: new ObjectId(id), category: 'hair-care' });
    } else {
      product = await collection.findOne({ id: parseInt(id), category: 'hair-care' });
    }
    
    if (!product) {
      // Try fallback data if MongoDB doesn't have the product
      const fallbackProduct = fallbackProducts.find(p => p.id === parseInt(id));
      if (fallbackProduct) {
        return res.json(fallbackProduct);
      }
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    
    // Try to return from fallback data
    const fallbackProduct = fallbackProducts.find(p => p.id === parseInt(id));
    if (fallbackProduct) {
      return res.json(fallbackProduct);
    }
    
    return res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
