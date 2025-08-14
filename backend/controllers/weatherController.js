const axios = require('axios');
const WeatherRecord = require('../models/WeatherRecords');

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// ----------------- Helpers -----------------
function isLatLon(q) {
  if (!q) return false;
  const parts = q.split(',').map((x) => x.trim());
  if (parts.length !== 2) return false;
  const [lat, lon] = parts;
  return !Number.isNaN(parseFloat(lat)) && !Number.isNaN(parseFloat(lon));
}
function isZip(q) {
  // naive: digits (with optional country code suffix like ",IN" or ",US")
  return /^\d{3,10}(\s*,\s*[A-Za-z]{2})?$/.test(q.trim());
}

async function resolveToCoords(q) {
  // Returns { name, state, country, lat, lon } using OpenWeather Geocoding API
  // q can be city/landmark OR zip,country
  let url;
  if (isLatLon(q)) {
    const [lat, lon] = q.split(',').map(Number);
    // reverse geocode for naming (optional)
    const rev = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
    const { data } = await axios.get(rev);
    const item = data?.[0] || {};
    return {
      name: item.name || `${lat},${lon}`,
      state: item.state || '',
      country: item.country || '',
      lat,
      lon,
    };
  } else if (isZip(q)) {
    const [zip, cc = 'US'] = q.split(',').map((x) => x.trim());
    url = `https://api.openweathermap.org/geo/1.0/zip?zip=${encodeURIComponent(zip)},${encodeURIComponent(cc)}&appid=${API_KEY}`;
    const { data } = await axios.get(url);
    return {
      name: data.name || zip,
      state: '',
      country: data.country || cc,
      lat: data.lat,
      lon: data.lon,
    };
  } else {
    // city/landmark fuzzy
    url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${API_KEY}`;
    const { data } = await axios.get(url);
    if (!Array.isArray(data) || data.length === 0) return null;
    const item = data[0];
    return {
      name: item.name || q,
      state: item.state || '',
      country: item.country || '',
      lat: item.lat,
      lon: item.lon,
    };
  }
}

function normalizeName(loc) {
  const bits = [loc.name, loc.state, loc.country].filter(Boolean);
  return bits.join(', ');
}

// ----------------- Controllers -----------------

// Live suggestions while typing (city/landmark)
exports.suggest = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);

    // direct geocoding (limit 5 suggestions)
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${API_KEY}`;
    const { data } = await axios.get(url);
    const suggestions = (data || []).map((it) => ({
      name: it.name,
      state: it.state || '',
      country: it.country || '',
      lat: it.lat,
      lon: it.lon,
      label: [it.name, it.state, it.country].filter(Boolean).join(', '),
    }));
    res.json(suggestions);
  } catch (err) {
    console.error('suggest error:', err.message);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};

// Get current weather (accepts q=city|zip,country|lat,lon)
exports.current = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Missing q' });

    const loc = await resolveToCoords(q);
    if (!loc) return res.status(404).json({ error: 'Location not found' });

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${API_KEY}`;
    const { data } = await axios.get(url);

    res.json({ location: loc, current: data });
  } catch (err) {
    console.error('current error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }
};

// 5-day forecast (accepts q=...)
exports.forecast = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Missing q' });

    const loc = await resolveToCoords(q);
    if (!loc) return res.status(404).json({ error: 'Location not found' });

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${API_KEY}`;
    const { data } = await axios.get(url);

    res.json({ location: loc, forecast: data });
  } catch (err) {
    console.error('forecast error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
};

// CREATE: save record with validation
exports.createRecord = async (req, res) => {
  try {
    const { locationInput, location, dateRange, current, forecast } = req.body;

    // date validation
    if (dateRange?.start && dateRange?.end) {
      const s = new Date(dateRange.start);
      const e = new Date(dateRange.end);
      if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) {
        return res.status(400).json({ error: 'Invalid dates' });
      }
      if (s > e) {
        return res.status(400).json({ error: 'Start date must be before end date' });
      }
    }

    // require at least coords or name to be meaningful
    if (!location || (!location.lat && !location.lon && !location.name)) {
      return res.status(400).json({ error: 'Missing location details' });
    }

    const doc = await WeatherRecord.create({
      locationInput: locationInput || location?.label || '',
      normalizedLocation: normalizeName(location),
      city: location.name || '',
      state: location.state || '',
      country: location.country || '',
      lat: location.lat,
      lon: location.lon,
      dateRange: dateRange || null,
      current: current || null,
      forecast: forecast || null,
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error('createRecord error:', err.message);
    res.status(500).json({ error: 'Failed to save record' });
  }
};

// READ: list all saved
exports.list = async (_req, res) => {
  const items = await WeatherRecord.find().sort({ createdAt: -1 }).lean();
  res.json(items);
};

// UPDATE: update dateRange or attach new weather payloads
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { dateRange, current, forecast } = req.body;

    const update = {};
    if (dateRange) {
      const { start, end } = dateRange;
      if (start && end && new Date(start) > new Date(end)) {
        return res.status(400).json({ error: 'Start date must be before end date' });
      }
      update.dateRange = dateRange;
    }
    if (current !== undefined) update.current = current;
    if (forecast !== undefined) update.forecast = forecast;

    const doc = await WeatherRecord.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    console.error('update error:', err.message);
    res.status(500).json({ error: 'Failed to update' });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await WeatherRecord.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    console.error('remove error:', err.message);
    res.status(500).json({ error: 'Failed to delete' });
  }
};
