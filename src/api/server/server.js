import express from 'express';
import mongoose from 'mongoose';
import Job from '../model/Job.js';  
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { GoogleGenerativeAI }  from "@google/generative-ai";
import cors from 'cors';

const app = express();
const PORT = 8000;
dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const dbURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=jobs`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


// Define endpoint to retrieve jobs from MongoDB
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define endpoint to add a new job
app.post('/jobs', async (req, res) => {
  const { title, company, type, description, location, salary } = req.body;

    // Create a new job object with a generated UUID
    const newJob = new Job({
      uuid: uuidv4(),
      title,
      company,
      type,
      description,
      location,
      salary,
    });
    console.log("New Job Object:", newJob);
  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add this route to fetch a specific job by ID
app.get('/jobs/:uuid', async (req, res) => {
  try {
    const job = await Job.findOne({ uuid: req.params.uuid });  // Fetch job by ID
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define endpoint to update an existing job
app.put('/jobs/:uuid', async (req, res) => {
  try {
    const updatedJob = await Job.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Define endpoint to delete a job
app.delete('/jobs/:uuid', async (req, res) => {
  try {
    const deletedJob = await Job.findOneAndDelete({ uuid: req.params.uuid });
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Define endpoint for chat
app.post('/chat', async (req, res) => {
  const { question } = req.body;
  // Example of handling the request
  try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(question);
      const responseText = result.response.text();
      res.json({ answer: responseText });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing your request.' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/jobs`);
});
