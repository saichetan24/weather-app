// import React, { useState } from 'react';
// import axios from 'axios';

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export default function WeatherForm({ onResult }) {
//   const [q, setQ] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (e) => {
//     e?.preventDefault();
//     if (!q) return alert('Please enter a city, zip, or place');
//     try {
//       setLoading(true);
//       // this backend route expects GET /api/weather/:city
//       const res = await axios.get(`${API_BASE}/api/weather/${encodeURIComponent(q)}`);
//       // backend might return raw API object OR compact { city, temperature, description, ... }
//       onResult(res.data, q);
//     } catch (err) {
//       console.error(err);
//       const msg = err.response?.data?.error || 'Failed to fetch weather';
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGeolocate = () => {
//     if (!navigator.geolocation) return alert('Geolocation not supported');
//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       try {
//         setLoading(true);
//         // If backend supports query-based fetch, we can call /api/weather/fetch?q=lat,lon
//         // But current backend route is /api/weather/:city. We'll call OpenWeather via backend using query param:
//         const res = await axios.get(`${API_BASE}/api/weather/fetch?q=${latitude},${longitude}`);
//         onResult(res.data, `${latitude},${longitude}`);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch by location');
//       } finally {
//         setLoading(false);
//       }
//     }, () => alert('Could not get your location. Allow location access or search manually.'));
//   };

//   return (
//     <form className="search-form" onSubmit={handleSearch}>
//       <input
//         value={q}
//         onChange={(e) => setQ(e.target.value)}
//         placeholder="Search city, zip code, or place..."
//         className="search-input"
//       />
//       <button type="submit" className="btn" disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
//       <button type="button" className="btn icon" onClick={handleGeolocate} title="Use my current location">📍</button>
//     </form>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";

// function WeatherForm({ onWeatherFetched }) {
//   const [location, setLocation] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Fetch location suggestions
//   const fetchSuggestions = async (query) => {
//     if (!query) {
//       setSuggestions([]);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
//       );
//       setSuggestions(res.data || []);
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!location || !startDate || !endDate) {
//       alert("Please fill all fields.");
//       return;
//     }
//     try {
//       const res = await axios.post("http://localhost:5000/api/weather", {
//         location,
//         startDate,
//         endDate,
//       });
//       onWeatherFetched(res.data);
//     } catch (err) {
//       console.error("Failed to fetch weather:", err);
//     }
//   };

//   return (
//     <div className="weather-form">
//       <form onSubmit={handleSubmit}>
//         <label>Location:</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => {
//             setLocation(e.target.value);
//             fetchSuggestions(e.target.value);
//           }}
//           placeholder="Enter city, zip, coords..."
//         />
//         {suggestions.length > 0 && (
//           <ul className="suggestions">
//             {suggestions.map((s, i) => (
//               <li
//                 key={i}
//                 onClick={() =>
//                   setLocation(`${s.name}, ${s.state || ""}, ${s.country}`)
//                 }
//               >
//                 {s.name} {s.state ? `(${s.state})` : ""}, {s.country}
//               </li>
//             ))}
//           </ul>
//         )}

//         <label>Start Date:</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />

//         <label>End Date:</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />

//         <button type="submit">Get Weather</button>
//       </form>
//     </div>
//   );
// }

// export default WeatherForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function WeatherForm({ onForecast }) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     if (query.length > 2) {
//       const timer = setTimeout(() => {
//         axios
//           .get(`/api/weather/locations?q=${query}`)
//           .then(res => setSuggestions(res.data))
//           .catch(() => setSuggestions([]));
//       }, 500);
//       return () => clearTimeout(timer);
//     } else {
//       setSuggestions([]);
//     }
//   }, [query]);

//   const handleSelect = (loc) => {
//     setSelectedLocation(loc);
//     setQuery(`${loc.name}, ${loc.country}`);
//     setSuggestions([]);
//     axios
//       .get(`/api/weather/forecast?lat=${loc.lat}&lon=${loc.lon}&save=false`)
//       .then(res => {
//         onForecast(res.data);
//       });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter city..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       {suggestions.length > 0 && (
//         <ul style={{ background: "#fff", padding: "5px", listStyle: "none" }}>
//           {suggestions.map((s, i) => (
//             <li
//               key={i}
//               style={{ cursor: "pointer" }}
//               onClick={() => handleSelect(s)}
//             >
//               {s.name}, {s.state || ""} {s.country}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default WeatherForm;

// import React, { useState } from "react";
// import axios from "axios";

// function WeatherForm({ onForecast }) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   // Fetch city suggestions
//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.length > 2) {
//       try {
//         const res = await axios.get(
//           `api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
//             import.meta.env.VITE_OPENWEATHERMAP_API_KEY
//           }`
//         );
//         setSuggestions(res.data);
//       } catch (err) {
//         console.error("Error fetching suggestions:", err);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Handle city selection
//   const handleSelect = async (city) => {
//     setQuery(`${city.name}, ${city.country}`);
//     setSuggestions([]);

//     try {
//       const res = await axios.get(
//         `/api/weather/forecast?lat=${city.lat}&lon=${city.lon}`
//       );
//       onForecast(res.data); // Pass data to Home.jsx
//     } catch (err) {
//       console.error("Error fetching forecast:", err);
//       alert("Could not fetch forecast");
//     }
//   };

//   return (
//     <div className="weather-form">
//       <label>
//         Location:
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder="Enter city name..."
//         />
//       </label>

//       {suggestions.length > 0 && (
//         <ul className="suggestions">
//           {suggestions.map((city, idx) => (
//             <li
//               key={idx}
//               onClick={() => handleSelect(city)}
//               style={{ cursor: "pointer" }}
//             >
//               {city.name}, {city.state ? city.state + ", " : ""} {city.country}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default WeatherForm;

// import React, { useState } from "react";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function WeatherForm({ onForecast }) {
//   const [q, setQ] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Get suggestions from backend (hides API key)
//   const onChange = async (e) => {
//     const value = e.target.value;
//     setQ(value);
//     if (value.trim().length < 2) { setSuggestions([]); return; }
//     try {
//       const { data } = await axios.get(`${API_BASE}/api/weather/suggest?q=${encodeURIComponent(value)}`);
//       setSuggestions(data);
//     } catch { setSuggestions([]); }
//   };

//   // Hit forecast by lat/lon from suggestion
//   const pick = async (sug) => {
//     setQ(sug.label);
//     setSuggestions([]);
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${API_BASE}/api/weather/forecast?lat=${sug.lat}&lon=${sug.lon}`);
//       onForecast(data);
//     } catch (e) {
//       alert("Could not fetch forecast");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Allow pressing Enter to search arbitrary input (city, zip, lat,lon)
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!q.trim()) return;
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${API_BASE}/api/weather/forecast?q=${encodeURIComponent(q.trim())}`);
//       onForecast(data);
//     } catch {
//       alert("Location not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="weather-form" onSubmit={onSubmit}>
//       <label>
//         Location:&nbsp;
//         <input
//           value={q}
//           onChange={onChange}
//           placeholder="City, ZIP, or lat,lon"
//           autoComplete="off"
//         />
//       </label>
//       <button className="btn" type="submit" disabled={loading}>
//         {loading ? "Loading…" : "Get Weather"}
//       </button>

//       {suggestions.length > 0 && (
//         <ul className="suggestions">
//           {suggestions.map((s, i) => (
//             <li key={i} onClick={() => pick(s)} style={{ cursor:'pointer' }}>
//               {s.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </form>
//   );
// }


import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function WeatherForm({ onForecast }) {
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get suggestions from backend (hides API key)
  const onChange = async (e) => {
    const value = e.target.value;
    setQ(value);
    if (value.trim().length < 2) { 
      setSuggestions([]); 
      return; 
    }
    
    try {
      const { data } = await axios.get(`${API_BASE}/api/weather/suggest?q=${encodeURIComponent(value)}`);
      setSuggestions(data);
    } catch { 
      setSuggestions([]); 
    }
  };

  // Hit forecast by lat/lon from suggestion
  const pick = async (sug) => {
    setQ(sug.label);
    setSuggestions([]);
    
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/api/weather/forecast?lat=${sug.lat}&lon=${sug.lon}`);
      onForecast(data);
    } catch (e) {
      alert("Could not fetch forecast");
    } finally {
      setLoading(false);
    }
  };

  // Allow pressing Enter to search arbitrary input (city, zip, lat,lon)
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    
    try {
      setLoading(true);
      setSuggestions([]); // Clear suggestions when submitting
      const { data } = await axios.get(`${API_BASE}/api/weather/forecast?q=${encodeURIComponent(q.trim())}`);
      onForecast(data);
    } catch {
      alert("Location not found");
    } finally {
      setLoading(false);
    }
  };

  // Clear input and suggestions
  const clearSearch = () => {
    setQ("");
    setSuggestions([]);
  };

  return (
    <div className="weather-form">
      <form onSubmit={onSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={q}
            onChange={onChange}
            placeholder="Enter city, ZIP code, or coordinates (lat,lon)..."
            autoComplete="off"
            className={`search-input glass ${loading ? 'loading' : ''}`}
            disabled={loading}
          />
          
          {q && (
            <button
              type="button"
              className="clear-btn"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          
          <button 
            className="search-btn btn" 
            type="submit" 
            disabled={loading || !q.trim()}
          >
            {loading ? (
              <span className="loading-spinner">⟳</span>
            ) : (
              "🔍"
            )}
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions glass">
          {suggestions.map((s, i) => (
            <li 
              key={i} 
              onClick={() => pick(s)} 
              className="suggestion-item"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && pick(s)}
            >
              <div className="suggestion-main">{s.name}</div>
              <div className="suggestion-sub">
                {[s.state, s.country].filter(Boolean).join(', ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}