const mongoose = require('mongoose');
const RechargePlan = require('./models/RechargePlan');

const samplePlans = [
  {
    planName: "Basic Pack",
    price: 199,
    validity: 28,
    description: "Perfect for light users",
    operator: "Jio",
    planType: "Prepaid",
    benefits: {
      data: "1.5GB/day",
      calls: "Unlimited",
      sms: "100/day"
    }
  },
  {
    planName: "Popular Pack", 
    price: 299,
    validity: 28,
    description: "Most popular choice",
    operator: "Airtel",
    planType: "Prepaid",
    benefits: {
      data: "2GB/day",
      calls: "Unlimited", 
      sms: "100/day"
    }
  },
  {
    planName: "Premium Pack",
    price: 599,
    validity: 84,
    description: "Long validity with high data",
    operator: "Vi",
    planType: "Prepaid",
    benefits: {
      data: "3GB/day",
      calls: "Unlimited",
      sms: "100/day"
    }
  }
];

async function seedPlans() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mobile-recharge');
    console.log('Connected to MongoDB');
    
    await RechargePlan.deleteMany({});
    console.log('Cleared existing plans');
    
    await RechargePlan.insertMany(samplePlans);
    console.log('Sample plans added successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
}

seedPlans();