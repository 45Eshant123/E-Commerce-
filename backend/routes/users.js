const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authz');

router.get('/', auth, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ success: true, users });
});

router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
});

router.put('/:id/role', auth, authorize('admin'), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );

  res.json({ success: true, user });
});

module.exports = router;
