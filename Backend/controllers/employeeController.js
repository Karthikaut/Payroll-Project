const Employee = require('../models/Employee.js');

const calculateAndUpdateSalaries = async () => {
  try {
    const employees = await Employee.find();
    for (const employee of employees) {
      const lop = employee.calculateLop();
      employee.updatedSalary = employee.salary - lop * (employee.salary / 30);
      await employee.save();
    }
  } catch (error) {
    console.error('Error calculating LOP and updating salaries:', error);
  }
};

const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find();
      const employeesWithCalculatedValues = employees.map(employee => {
        const lop = employee.calculateLop();
        const updatedSalary = employee.salary - lop * (employee.salary / 30);
        return {
          ...employee.toObject(),
          lop,
          updatedSalary
        };
      });
      res.json(employeesWithCalculatedValues);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching employees' });
    }
  };

module.exports = {
  calculateAndUpdateSalaries,
  getEmployees
};
