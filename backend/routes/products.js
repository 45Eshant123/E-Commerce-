const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authz');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, products });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ id: Number(req.params.id) });
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

router.post('/', auth, authorize('admin'), async (req, res) => {
  const last = await Product.findOne().sort({ id: -1 });
  const id = last ? last.id + 1 : 1;

  const product = await Product.create({ ...req.body, id });
  res.status(201).json({ success: true, product });
});

router.put('/:id', auth, authorize('admin'), async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { id: Number(req.params.id) },
    req.body,
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, product });
});

router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  const product = await Product.findOneAndDelete({ id: Number(req.params.id) });

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, message: 'Product deleted' });
});

module.exports = router;
