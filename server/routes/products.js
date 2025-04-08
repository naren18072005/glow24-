
const express = require('express');
const router = express.Router();

// Sample product data (in a real application, this would come from a database)
const products = [
  {
    id: 1,
    name: "Hair Oil",
    description: "Nourishing hair oil that strengthens hair follicles and promotes healthy growth.",
    price: 199,
    image: "/lovable-uploads/666e7309-d5d2-456a-ba0a-2bd5e0db41f6.png",
    isBestSeller: true,
    category: 'hair-care'
  },
  {
    id: 2,
    name: "Rosemary Spray",
    description: "Refreshing rosemary spray that stimulates the scalp and adds shine to hair.",
    price: 150,
    image: "/lovable-uploads/8b6970d3-aa7a-4b17-b67b-3b06dd0b3383.png",
    category: 'hair-care'
  },
  {
    id: 3,
    name: "Golden Serum (15ml)",
    description: "Luxurious golden serum that brightens and evens skin tone, enhancing your natural glow.",
    price: 250,
    image: "/lovable-uploads/34914154-1774-4647-a973-b580b0ba3e64.png",
    category: 'skin-care'
  },
  {
    id: 4,
    name: "Golden Serum (30ml)",
    description: "Our premium gold-infused face serum for radiant, youthful skin in a larger size.",
    price: 350,
    image: "/lovable-uploads/34914154-1774-4647-a973-b580b0ba3e64.png",
    category: 'skin-care'
  },
  {
    id: 5,
    name: "Strawberry Lip Balm",
    description: "Hydrating lip balm with delicious strawberry flavor for soft, plump lips.",
    price: 70,
    image: "/lovable-uploads/75403ddb-c41d-4a13-a08c-ee678bdd4573.png",
    category: 'skin-care'
  },
  {
    id: 6,
    name: "Golden Facewash",
    description: "Gentle cleansing facewash that removes impurities while maintaining your skin's natural moisture.",
    price: 150,
    image: "/lovable-uploads/da5c0bf6-73f5-4067-9fd4-f0d64d8c0706.png",
    category: 'skin-care'
  },
  {
    id: 7,
    name: "Natural Soaps",
    description: "Handcrafted organic soaps made with natural ingredients for a refreshing cleanse.",
    price: 50,
    image: "/lovable-uploads/9f5280ac-d499-4bdf-bba1-28e2f3a829d5.png",
    category: 'skin-care'
  },
  {
    id: 8,
    name: "Aloe Vera Gel",
    description: "Soothing aloe vera gel that calms irritated skin and provides deep hydration.",
    price: 199,
    image: "/lovable-uploads/fb77df66-ff33-4208-91fe-fab026973b83.png",
    category: 'skin-care'
  },
  {
    id: 9,
    name: "Saffron Gel",
    description: "Luxurious saffron-infused gel that brightens skin and reduces pigmentation.",
    price: 150,
    image: "/lovable-uploads/60b6dc7a-818d-4be6-a5d6-6d91245c129a.png",
    category: 'skin-care'
  }
];

// GET all products
router.get('/', (req, res) => {
  // Adding artificial delay to simulate network latency
  setTimeout(() => {
    res.json(products);
  }, 500);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

module.exports = router;
