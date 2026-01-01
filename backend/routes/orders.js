const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authz');

router.post('/', auth, async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    items: req.body.items,
    totalAmount: req.body.totalAmount,
    status: 'processing'
  });

  res.status(201).json({ success: true, order });
});

router.get('/', auth, authorize('admin'), async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json({ success: true, orders });
});

router.put('/:id/status', auth, authorize('admin'), async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, order });
});

module.exports = router;
