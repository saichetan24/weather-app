// import React, { useState } from 'react';
// import axios from 'axios';

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// function parseWeather(data) {
//   // If backend returned raw OpenWeather response:
//   if (data && data.main && data.weather) {
//     return {
//       name: data.name || data?.sys?.name || '',
//       temp: Math.round(data.main.temp),
//       feels_like: data.main?.feels_like,
//       humidity: data.main?.humidity,
//       description: data.weather[0]?.description,
//       icon: data.weather[0]?.icon,
//       raw: data
//     };
//   }
//   // If backend returned compact object
//   if (data && (data.temperature || data.temp)) {
//     return {
//       name: data.city || data.name || '',
//       temp: Math.round(data.temperature || data.temp),
//       description: data.description || data.weather,
//       raw: data
//     };
//   }
//   // fallback
//   return { raw: data };
// }

// export default function WeatherCard({ weather, locationLabel }) {
//   const [saving, setSaving] = useState(false);
//   const [start, setStart] = useState('');
//   const [end, setEnd] = useState('');
//   const parsed = parseWeather(weather);

//   const handleSave = async () => {
//     if (!parsed.raw) return alert('No weather to save');
//     // validation for date range
//     if (start && end && new Date(start) > new Date(end)) return alert('Start date must be before end date');

//     const payload = {
//       location: locationLabel || parsed.name || 'Unknown',
//       dateRange: (start || end) ? { start: start || null, end: end || null } : null,
//       // send the raw weather object so backend can store it
//       weatherData: parsed.raw
//     };

//     try {
//       setSaving(true);
//       const res = await axios.post(`${API_BASE}/api/weather`, payload);
//       alert('Saved to history');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save record');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="weather-card">
//       <div className="card-top">
//         <h2 className="city">{parsed.name || locationLabel || 'Location'}</h2>
//         <div className="temp">{parsed.temp !== undefined ? `${parsed.temp}°C` : '--'}</div>
//       </div>

//       <div className="card-mid">
//         <div className="desc">{parsed.description || '—'}</div>
//         {parsed.humidity !== undefined && <div className="meta">Humidity: {parsed.humidity}%</div>}
//         {parsed.feels_like !== undefined && <div className="meta">Feels like: {Math.round(parsed.feels_like)}°C</div>}
//       </div>

//       <div className="save-section">
//         <label>Start date
//           <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
//         </label>
//         <label>End date
//           <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
//         </label>
//         <button className="btn save-btn" onClick={handleSave} disabled={saving}>
//           {saving ? 'Saving...' : 'Save Weather Data'}
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.forecast) return null;

  return (
    <div className="weather-card">
      <h2>{weatherData.city}</h2>
      <h4>{weatherData.description}</h4>
      <p>Current Temp: {weatherData.temperature}°C</p>

      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {weatherData.forecast.map((day, idx) => (
          <div key={idx} className="forecast-day">
            <p>{new Date(day.date).toLocaleDateString()}</p>
            <p>{day.temp}°C</p>
            <p>{day.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
