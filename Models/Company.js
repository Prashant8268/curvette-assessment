const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  employeeSize: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  verifiedEmail: {
    type: Boolean,
    required: true,
    default: false,
  },
  verifiedPhone: {
    type: Boolean,
    required: true,
    default: false,
  },
  emailOtp: {
    type: String, // Store OTP
    default: null,
  },
  emailOtpExpires: {
    type: Date, // Store OTP expiration time
    default: null,
  },
  phoneOtp: {
    type: String,
    default: null,
  },
  phoneOtpExpires: {
    type: Date,
    default: null,
  },
});

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

module.exports = Company;
