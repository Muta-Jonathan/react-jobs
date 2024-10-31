import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true, // Ensure UUID is unique
  },
  title: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    description: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
  },
  type: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

export default Job;
