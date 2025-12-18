const RechargePlan = require('../models/RechargePlan');

// Get all plans
const getPlans = async (req, res) => {
  try {
    const plans = await RechargePlan.find({ isActive: true });
    res.json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get plan by ID
const getPlanById = async (req, res) => {
  try {
    const plan = await RechargePlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new plan (Admin only)
const createPlan = async (req, res) => {
  try {
    const plan = await RechargePlan.create(req.body);
    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update plan (Admin only)
const updatePlan = async (req, res) => {
  try {
    const plan = await RechargePlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete plan (Admin only)
const deletePlan = async (req, res) => {
  try {
    const plan = await RechargePlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};