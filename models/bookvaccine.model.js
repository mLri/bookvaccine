const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookVaccineSchema = new Schema({
  prefix: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  employee_id: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  date_time: {
    type: Date,
    required: true
  }
}, {
  timestamps: { createdAt: 'timestamp.created_at', updatedAt: 'timestamp.updated_at' }
})

module.exports = mongoose.model('bookvaccine', bookVaccineSchema)