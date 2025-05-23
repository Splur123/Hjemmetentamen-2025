const express = require('express');
const path = require('path');
const routes = require('./routes');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://10.12.1.201:27017/hjemmetentamen')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // KRITISK: Mangler for å håndtere JSON

// Middleware
const logger = require('./middleware/logger');
app.use(logger);

app.use('/', routes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 80; // Endret til port 80 som kreves
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});