const express = require('express');
const router = express.Router();
const {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer
} = require('../controllers/offerController');

// GET /api/offers - Get all offers
router.get('/', getOffers);

// POST /api/offers - Create new offer
router.post('/', createOffer);

// PUT /api/offers/:id - Update offer
router.put('/:id', updateOffer);

// DELETE /api/offers/:id - Delete offer
router.delete('/:id', deleteOffer);

module.exports = router;