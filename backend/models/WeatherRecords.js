const mongoose = require('mongoose');

const WeatherRecordSchema = new mongoose.Schema(
  {
    // what the user typed / selected
    locationInput: { type: String },               // e.g., "Hyderabad" or "500016,IN" or "17.4,78.4"
    normalizedLocation: { type: String },          // e.g., "Hyderabad, Telangana, IN"

    // resolved
    city: String,
    state: String,
    country: String,
    lat: Number,
    lon: Number,

    // optional date range
    dateRange: {
      start: { type: Date, default: null },
      end:   { type: Date, default: null },
    },

    // weather payloads
    current:  { type: Object, default: null },     // OpenWeather current weather response
    forecast: { type: Object, default: null },     // OpenWeather 5-day/3-hr forecast response
  },
  { timestamps: true }
);

module.exports = mongoose.model('WeatherRecord', WeatherRecordSchema);
