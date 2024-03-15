const express = require('express');
const cors = require('cors');

const musicRoutes = require('./src/routes/musicRoutes');
const errorHandler = require('./src/utils/errorHandler');

const app = express();

// Enable All CORS Requests for development
app.use(cors());
app.use(express.json());

// const corsOptions = {
//     origin: 'http://localhost:3000', // or the specific domain you want to allow
//     optionsSuccessStatus: 200
// };
  
// app.use(cors(corsOptions));

// Use music routes for any request that starts with '/api/music'
app.use('/api/music', musicRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
