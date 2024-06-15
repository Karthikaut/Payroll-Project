const express = require('express');
const { getEmployees } = require('../controllers/employeeController.js');
const router = express.Router();

router.get('/employees', getEmployees);

module.exports = router;
