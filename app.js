const express = require('express');
const path = require('path');
const routes = require('./routes');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const app = express();

// Connect to MongoDB with fallback
const connectDB = require('./config/database');
connectDB().catch(err => {
  console.error('Failed to connect to any MongoDB server. Application may not function correctly.');
  console.error('Final error:', err);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
const logger = require('./middleware/logger');
app.use(logger);

app.use('/', routes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});