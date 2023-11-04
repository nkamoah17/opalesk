const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/openAgent';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(DB_URI, options)
  .then(() => console.log('MongoDB connection established successfully.'))
  .catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose;
