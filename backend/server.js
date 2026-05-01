const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/syncsetu';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
const contactRoutes = require('./routes/contactRoutes');
const leadRoutes = require('./routes/leadRoutes');

app.use('/api/contacts', contactRoutes);
app.use('/api/leads', leadRoutes);

// Root Route
app.get('/', (req, res) => {

  res.json({ message: 'Welcome to SyncSetu API' });
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
