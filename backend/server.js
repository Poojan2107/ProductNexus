const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Poojan:ProductNexus@productnexus.x2fbefr.mongodb.net/';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');

    // Routes (register after DB is ready)
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!' });
    });

    // Start server and bind explicitly to 0.0.0.0 so localhost probes (IPv4) can reach it
    const HOST = process.env.HOST || '0.0.0.0';
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Exit with non-zero so a process manager (nodemon) shows the failure
    process.exit(1);
  });
