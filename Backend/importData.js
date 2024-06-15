require('dotenv').config();
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const path = require('path');
const Employee = require('./models/Employee');

const MONGODB_URI = process.env.MONGODB_URI;
const EXCEL_FILE_PATH = process.env.EXCEL_FILE_PATH;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    importData();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

const importData = async () => {
  try {
    const filePath = path.resolve(__dirname, EXCEL_FILE_PATH);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const record of data) {
      const { EmployeeID, Name, Salary, Type } = record;

      if (!EmployeeID || !Name || !Salary || !Type) {
        console.warn(`Skipping record due to missing required fields: ${JSON.stringify(record)}`);
        continue;
      }

      await Employee.create({
        employeeId: EmployeeID,
        name: Name,
        salary: Salary,
        type: Type,
        lateCount: Math.floor(Math.random() * 10), // Example data
        earlyOutCount: Math.floor(Math.random() * 10) // Example data
      });
    }
    console.log('Data import completed');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error importing data', error);
    mongoose.disconnect();
  }
};
