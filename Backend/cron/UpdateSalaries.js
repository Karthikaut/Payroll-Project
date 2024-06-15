const cron = require('node-cron');
const { calculateAndUpdateSalaries } = require('../controllers/employeeController');

// Run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Calculating LOP and updating salaries...');
  calculateAndUpdateSalaries();
});
