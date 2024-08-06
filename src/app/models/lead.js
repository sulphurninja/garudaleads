// models/lead.js
import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  officerName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  policeStation: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  idFrontUrl: {
    type: String,
    required: true,
  },
  idBackUrl: {
    type: String,
    required: true,
  },
  referredBy: {
    type: String,
  },
}, { timestamps: true });

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

export default Lead;
