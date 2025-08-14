const express = require('express');
const axios = require('axios');
const WeatherRecord = require('../models/WeatherRecords');

const router = express.Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ---------- helpers ----------
function isLatLon(q) {
  if (!q) return false;
  const p = q.split(',').map(s => s.trim());
  if (p.length !== 2) return false;
  const [lat, lon] = p.map(Number);
  return !Number.isNaN(lat) && !Number.isNaN(lon);
}
function isZip(q) { return /^\d{3,10}(\s*,\s*[A-Za-z]{2})?$/.test((q||'').trim()); }

async function resolveToCoords(q) {
  if (isLatLon(q)) {
    const [lat, lon] = q.split(',').map(Number);
    const rev = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
    const { data } = await axios.get(rev);
    const it = data?.[0] || {};
    return { name: it.name || `${lat},${lon}`, state: it.state || '', country: it.country || '', lat, lon };
  }
  if (isZip(q)) {
    const [zip, cc='US'] = q.split(',').map(s => s.trim());
    const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${encodeURIComponent(zip)},${encodeURIComponent(cc)}&appid=${API_KEY}`;
    const { data } = await axios.get(url);
    return { name: data.name || zip, state: '', country: data.country || cc, lat: data.lat, lon: data.lon };
  }
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${API_KEY}`;
  const { data } = await axios.get(url);
  if (!Array.isArray(data) || data.length === 0) return null;
  const it = data[0];
  return { name: it.name, state: it.state || '', country: it.country || '', lat: it.lat, lon: it.lon };
}

function normalizeName(loc) {
  return [loc.name, loc.state, loc.country].filter(Boolean).join(', ');
}
function mostCommon(arr) {
  return arr.sort((a,b)=>arr.filter(v=>v===a).length - arr.filter(v=>v===b).length).pop();
}

// ---------- API ----------

// Live suggestions (proxy OpenWeather geocoding; hides API key from frontend)
router.get('/suggest', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${API_KEY}`;
    const { data } = await axios.get(url);
    const out = (data||[]).map(it => ({
      name: it.name,
      state: it.state || '',
      country: it.country,
      lat: it.lat, lon: it.lon,
      label: [it.name, it.state, it.country].filter(Boolean).join(', ')
    }));
    res.json(out);
  } catch (e) {
    console.error('suggest:', e.message);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

// 5-day forecast (by lat/lon OR q=city|zip,country|lat,lon)
router.get('/forecast', async (req, res) => {
  try {
    let { lat, lon, q } = req.query;
    let loc;

    if (lat && lon) {
      lat = Number(lat); lon = Number(lon);
      const rev = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
      const { data } = await axios.get(rev);
      const it = data?.[0] || {};
      loc = { name: it.name || `${lat},${lon}`, state: it.state || '', country: it.country || '', lat, lon };
    } else if (q) {
      loc = await resolveToCoords(q);
    } else {
      return res.status(400).json({ error: 'Provide lat & lon or q' });
    }
    if (!loc) return res.status(404).json({ error: 'Location not found' });

    const ow = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: { lat: loc.lat, lon: loc.lon, units: 'metric', appid: API_KEY }
    });

    // group by date
    const daily = {};
    ow.data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!daily[date]) daily[date] = { temps: [], descs: [] };
      daily[date].temps.push(item.main.temp);
      daily[date].descs.push(item.weather[0].description);
    });

    const summary = Object.entries(daily).slice(0,5).map(([date, v]) => ({
      date,
      avgTemp: Math.round(v.temps.reduce((a,b)=>a+b,0)/v.temps.length),
      weather: mostCommon(v.descs)
    }));

    res.json({
      location: { ...loc, label: normalizeName(loc) },
      city: { name: loc.name, country: loc.country, coord: { lat: loc.lat, lon: loc.lon } },
      forecast: summary,
      raw: ow.data, // keep if you want more detail
    });
  } catch (e) {
    console.error('forecast:', e.response?.data || e.message);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

// CREATE (save). Body can include location/dateRange/current/forecast.
// Frontend will ask user first, then call this.
router.post('/', async (req, res) => {
  try {
    const { locationInput, location, dateRange, current, forecast } = req.body;
    if (!location || !forecast) return res.status(400).json({ error: 'location and forecast are required' });
    if (dateRange?.start && dateRange?.end && new Date(dateRange.start) > new Date(dateRange.end)) {
      return res.status(400).json({ error: 'Start date must be before end date' });
    }
    const doc = await WeatherRecord.create({
      locationInput: locationInput || location.label || '',
      normalizedLocation: normalizeName(location),
      city: location.name || '',
      state: location.state || '',
      country: location.country || '',
      lat: location.lat, lon: location.lon,
      dateRange: dateRange || null,
      current: current || null,
      forecast: forecast || null
    });
    res.status(201).json(doc);
  } catch (e) {
    console.error('create:', e.message);
    res.status(500).json({ error: 'Failed to save record' });
  }
});

// READ (list)
router.get('/', async (_req, res) => {
  const items = await WeatherRecord.find().sort({ createdAt: -1 }).lean();
  res.json(items);
});

// UPDATE (dateRange or attach updated weather)
router.put('/:id', async (req, res) => {
  try {
    const { dateRange, current, forecast } = req.body;
    const upd = {};
    if (dateRange) {
      const { start, end } = dateRange;
      if (start && end && new Date(start) > new Date(end)) {
        return res.status(400).json({ error: 'Start date must be before end date' });
      }
      upd.dateRange = dateRange;
    }
    if (current !== undefined) upd.current = current;
    if (forecast !== undefined) upd.forecast = forecast;

    const doc = await WeatherRecord.findByIdAndUpdate(req.params.id, upd, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (e) {
    console.error('update:', e.message);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const doc = await WeatherRecord.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    console.error('delete:', e.message);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
