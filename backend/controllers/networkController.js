const Network = require('../models/Network');

// Get all networks
const getNetworks = async (req, res) => {
  try {
    const networks = await Network.find().sort({ createdAt: -1 });
    res.json({ success: true, networks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create network
const createNetwork = async (req, res) => {
  try {
    const { name, country } = req.body;
    const network = new Network({ name, country });
    await network.save();
    res.status(201).json({ success: true, network });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update network
const updateNetwork = async (req, res) => {
  try {
    const { id } = req.params;
    const network = await Network.findByIdAndUpdate(id, req.body, { new: true });
    if (!network) {
      return res.status(404).json({ success: false, message: 'Network not found' });
    }
    res.json({ success: true, network });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete network
const deleteNetwork = async (req, res) => {
  try {
    const { id } = req.params;
    const network = await Network.findByIdAndDelete(id);
    if (!network) {
      return res.status(404).json({ success: false, message: 'Network not found' });
    }
    res.json({ success: true, message: 'Network deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getNetworks,
  createNetwork,
  updateNetwork,
  deleteNetwork
};