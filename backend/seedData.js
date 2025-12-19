require('dotenv').config();
const mongoose = require('mongoose');
const RechargePlan = require('./models/RechargePlan');
const Offer = require('./models/Offer');
const Network = require('./models/Network');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await RechargePlan.deleteMany({});
    await Offer.deleteMany({});
    await Network.deleteMany({});

    // Seed plans
    const plans = [
      {
        name: 'Basic Plan',
        price: 199,
        data: '1.5GB/day',
        validity: '28 days'
      },
      {
        name: 'Premium Plan',
        price: 299,
        data: '2GB/day',
        validity: '28 days'
      },
      {
        name: 'Ultimate Plan',
        price: 599,
        data: '3GB/day',
        validity: '84 days'
      }
    ];

    // Seed offers
    const offers = [
      {
        title: 'New User Offer',
        description: 'Special discount for new users',
        discount: 20,
        simType: 'Prepaid'
      },
      {
        title: 'Weekend Special',
        description: 'Extra cashback on weekends',
        discount: 15,
        simType: 'Postpaid'
      }
    ];

    // Seed networks
    const networks = [
      {
        name: 'Airtel',
        country: 'India'
      },
      {
        name: 'Jio',
        country: 'India'
      },
      {
        name: 'Vi',
        country: 'India'
      }
    ];

    await RechargePlan.insertMany(plans);
    await Offer.insertMany(offers);
    await Network.insertMany(networks);

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();