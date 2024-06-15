const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  type: { type: String, required: true },
  lateCount: { type: Number, default: 0 },
  earlyOutCount: { type: Number, default: 0 }
});

employeeSchema.methods.calculateLop = function() {
  if (this.type === 'Management') {
    return 0;
  }
  const totalViolations = this.lateCount + this.earlyOutCount;
  return 0.5 * Math.floor(totalViolations / 3);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
