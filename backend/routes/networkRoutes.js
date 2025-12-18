const express = require('express');
const router = express.Router();
const {
  getNetworks,
  createNetwork,
  updateNetwork,
  deleteNetwork
} = require('../controllers/networkController');

// GET /api/networks - Get all networks
router.get('/', getNetworks);

// POST /api/networks - Create new network
router.post('/', createNetwork);

// PUT /api/networks/:id - Update network
router.put('/:id', updateNetwork);

// DELETE /api/networks/:id - Delete network
router.delete('/:id', deleteNetwork);

module.exports = router;