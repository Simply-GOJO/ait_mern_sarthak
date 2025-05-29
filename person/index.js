const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const mongoURI = 'mongodb://127.0.0.1:27017/nithin_db';

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Disconnect from MongoDB
const disconnectFromMongoDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error disconnecting from MongoDB', err);
  }
};

disconnectFromMongoDB();

app.listen(port, () => {
    console.log('Server is running on port 3000')
  });

//  console.log(`Server is running on http://localhost:${port}`);