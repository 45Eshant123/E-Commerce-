const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Cosine similarity function for embeddings
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Get recommendations for a product
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Find the target product
    const targetProduct = await Product.findOne({ id: productId });
    if (!targetProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let recommendations = [];

    // Try AI-based recommendations first (if embeddings exist)
    if (targetProduct.embedding && targetProduct.embedding.length > 0) {
      const allProducts = await Product.find({
        id: { $ne: productId },
        embedding: { $exists: true, $ne: [] }
      });

      // Calculate similarity scores
      const similarities = allProducts.map(product => ({
        product,
        similarity: cosineSimilarity(targetProduct.embedding, product.embedding)
      }));

      // Sort by similarity and take top 6
      similarities.sort((a, b) => b.similarity - a.similarity);
      recommendations = similarities.slice(0, 6).map(item => item.product);
    }

    // Fallback to category-based recommendations if no AI recommendations or insufficient
    if (recommendations.length < 4) {
      const categoryProducts = await Product.find({
        id: { $ne: productId },
        category: targetProduct.category
      }).limit(6);

      // Filter out already recommended products
      const recommendedIds = new Set(recommendations.map(p => p.id));
      const additionalProducts = categoryProducts.filter(p => !recommendedIds.has(p.id));

      recommendations = [...recommendations, ...additionalProducts].slice(0, 6);
    }

    // If still no recommendations, get random products
    if (recommendations.length === 0) {
      const randomProducts = await Product.aggregate([
        { $match: { id: { $ne: productId } } },
        { $sample: { size: 6 } }
      ]);
      recommendations = randomProducts;
    }

    // Format response
    const formattedRecommendations = recommendations.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      inStock: product.inStock,
      features: product.features
    }));

    res.json({
      success: true,
      recommendations: formattedRecommendations,
      method: targetProduct.embedding && targetProduct.embedding.length > 0 ? 'ai' : 'category'
    });

  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Seed products with basic embeddings (simplified for demo)
router.post('/seed-embeddings', async (req, res) => {
  try {
    const products = await Product.find({});

    // Simple embedding generation based on category and keywords
    const categoryEmbeddings = {
      'Electronics': [1, 0, 0, 0],
      'Fashion': [0, 1, 0, 0],
      'Home': [0, 0, 1, 0],
      'Sports': [0, 0, 0, 1]
    };

    for (const product of products) {
      const baseEmbedding = categoryEmbeddings[product.category] || [0.25, 0.25, 0.25, 0.25];

      // Add some variation based on product name length and price
      const variation = [
        product.name.length / 100,
        product.price / 1000,
        product.rating / 5,
        product.reviews / 1000
      ];

      const embedding = baseEmbedding.map((val, i) => val + variation[i] * 0.1);

      await Product.updateOne(
        { id: product.id },
        { embedding: embedding }
      );
    }

    res.json({
      success: true,
      message: 'Embeddings seeded successfully'
    });

  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed embeddings',
      error: error.message
    });
  }
});

module.exports = router;
