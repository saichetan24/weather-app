// const mongoose = require('mongoose');

// const weatherSchema = new mongoose.Schema({
//   city: { type: String, required: true },
//   temperature: Number,
//   description: String,
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Weather', weatherSchema);


// backend/models/Weather.js
// const mongoose = require('mongoose');

// const WeatherSchema = new mongoose.Schema({
//   location: {
//     // store the user input location string (city name, zip, coords)
//     type: String,
//     required: true,
//   },
//   normalizedLocation: {
//     // optional: store resolved location name returned by API
//     type: String
//   },
//   dateRange: {
//     start: Date,
//     end: Date
//   },
//   // store the raw API response or a compacted subset
//   weatherData: {
//     type: Object,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Weather', WeatherSchema);


// const mongoose = require('mongoose');

// const weatherSchema = new mongoose.Schema({
//   city: { type: String, required: true },
//   temperature: Number,
//   description: String,
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Weather', weatherSchema);

const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: Number,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);
