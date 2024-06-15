import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Salary</th>
          <th>Calculated Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.employeeId}>
            <td>{emp.employeeId}</td>
            <td>{emp.name}</td>
            <td>{emp.type}</td>
            <td>{emp.salary}</td>
            <td>{emp.calculatedSalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
