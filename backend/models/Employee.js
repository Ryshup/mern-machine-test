const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: [{ type: String }],
  img: { type: String },
  createdDate: { type: Date, default: Date.now } // Add this field
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
