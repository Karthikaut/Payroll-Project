require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employees.js');
const cors = require('cors');
const { calculateAndUpdateSalaries } = require('./controllers/employeeController.js');
require('./cron/UpdateSalaries.js'); // Ensure the cron job is imported

const app = express();
const port = process.env.PORT || 8000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    calculateAndUpdateSalaries(); // Calculate LOP and update salaries on startup
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(express.json());
app.use(cors());
app.use('/api', employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
