const mongoose = require('mongoose');

// Connect to MongoDB using the connection URI from environment variables,
// or fallback to a local MongoDB instance if the environment variable is not set.
// mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/nomadnotesdb');

// Use the environment variable for MongoDB connection
const dbUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/localDbName';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the mongoose connection object to be used elsewhere in the application
module.exports = mongoose.connection;

// mongodb+srv://donnacancode:DaC05201022@cluster0.zxsnm.mongodb.net/nomadnotesdb?retryWrites=true&w=majority&appName=Cluster0