require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes');
const networkRoutes = require('./routes/networkRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Keep-alive and health check routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mobile Recharge CRUD & Auth API is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Keep-alive ping endpoint
app.get('/ping', (req, res) => {
  res.json({ pong: true, timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/networks', networkRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});