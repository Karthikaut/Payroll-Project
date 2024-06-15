import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/style.css'

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')  // Update URL to use full URL with http://localhost:8000
      .then(response => {
        console.log(response.data);  // Log the response to verify data
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Employee Salaries</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Type</th>
            <th>Late Count</th>
            <th>Early Out Count</th>
            <th>LOP</th>
            <th>Updated Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>${employee.salary}</td>
              <td>{employee.type}</td>
              <td>{employee.lateCount}</td>
              <td>{employee.earlyOutCount}</td>
              <td>{employee.lop ? employee.lop.toFixed(2) : '-'}</td>
              <td>${employee.updatedSalary ? employee.updatedSalary.toFixed(2) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;