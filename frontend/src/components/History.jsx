// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export default function History() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchHistory = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/api/weather`);
//       // handle both {records: [...]} and direct array
//       const data = res.data.records || res.data || [];
//       setRecords(data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchHistory(); }, []);

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this record?')) return;
//     try {
//       await axios.delete(`${API_BASE}/api/weather/${id}`);
//       setRecords((r) => r.filter((x) => x._id !== id && x.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete');
//     }
//   };

//   return (
//     <div className="history-page">
//       <div className="history-header">
//         <Link to="/" className="back-link">← Back to Weather</Link>
//         <h1>Weather History</h1>
//       </div>

//       <div className="history-filters">
//         {/* Basic UI placeholder for filters */}
//         <div>Filter by location / dates will go here (optional)</div>
//       </div>

//       <div className="history-list">
//         {loading ? (
//           <div>Loading...</div>
//         ) : records.length === 0 ? (
//           <div>No saved records yet.</div>
//         ) : (
//           <table className="history-table">
//             <thead>
//               <tr>
//                 <th>Location</th>
//                 <th>Date Range</th>
//                 <th>Weather</th>
//                 <th>Searched On</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((rec) => {
//                 const loc = rec.normalizedLocation || rec.location || (rec.weatherData?.name) || 'Unknown';
//                 const start = rec.dateRange?.start ? new Date(rec.dateRange.start).toLocaleDateString() : '-';
//                 const end = rec.dateRange?.end ? new Date(rec.dateRange.end).toLocaleDateString() : '-';
//                 const temp = rec.weatherData?.main?.temp ? `${Math.round(rec.weatherData.main.temp)}°C` : (rec.temperature ? `${rec.temperature}°C` : '-');
//                 const searchedOn = rec.createdAt ? new Date(rec.createdAt).toLocaleString() : '-';
//                 return (
//                   <tr key={rec._id || rec.id}>
//                     <td>{loc}</td>
//                     <td>{start} - {end}</td>
//                     <td>{temp} {rec.weatherData?.weather?.[0]?.description || rec.description || ''}</td>
//                     <td>{searchedOn}</td>
//                     <td>
//                       <button className="icon-btn" onClick={() => alert('View not implemented yet')}>👁</button>
//                       <button className="icon-btn" onClick={() => handleDelete(rec._id || rec.id)}>🗑️</button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function History() {
//   const [history, setHistory] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [editData, setEditData] = useState({ location: "", startDate: "", endDate: "" });

//   const fetchHistory = async () => {
//     const res = await axios.get("http://localhost:5000/api/weather");
//     setHistory(res.data);
//   };

//   const deleteRecord = async (id) => {
//     await axios.delete(`http://localhost:5000/api/weather/${id}`);
//     fetchHistory();
//   };

//   const startEdit = (record) => {
//     setEditing(record._id);
//     setEditData({
//       location: record.city,
//       startDate: record.startDate?.slice(0, 10) || "",
//       endDate: record.endDate?.slice(0, 10) || "",
//     });
//   };

//   const saveEdit = async () => {
//     await axios.put(`http://localhost:5000/api/weather/${editing}`, editData);
//     setEditing(null);
//     fetchHistory();
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   return (
//     <div>
//       <h2>Saved Weather History</h2>
//       {history.map((rec) => (
//         <div key={rec._id} className="history-item">
//           {editing === rec._id ? (
//             <>
//               <input
//                 value={editData.location}
//                 onChange={(e) => setEditData({ ...editData, location: e.target.value })}
//               />
//               <input
//                 type="date"
//                 value={editData.startDate}
//                 onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
//               />
//               <input
//                 type="date"
//                 value={editData.endDate}
//                 onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
//               />
//               <button onClick={saveEdit}>Save</button>
//             </>
//           ) : (
//             <>
//               <p>{rec.city} ({rec.startDate?.slice(0,10)} - {rec.endDate?.slice(0,10)})</p>
//               <button onClick={() => startEdit(rec)}>Edit</button>
//               <button onClick={() => deleteRecord(rec._id)}>Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default History;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function History() {
//   const [items, setItems] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [range, setRange] = useState({ start: "", end: "" });

//   const load = async () => {
//     const { data } = await axios.get(`${API_BASE}/api/weather`);
//     setItems(data);
//   };

//   const startEdit = (rec) => {
//     setEditing(rec._id);
//     setRange({
//       start: rec?.dateRange?.start ? rec.dateRange.start.slice(0,10) : "",
//       end:   rec?.dateRange?.end   ? rec.dateRange.end.slice(0,10)   : "",
//     });
//   };

//   const save = async () => {
//     await axios.put(`${API_BASE}/api/weather/${editing}`, { dateRange: { ...range } });
//     setEditing(null);
//     await load();
//   };

//   const remove = async (id) => {
//     await axios.delete(`${API_BASE}/api/weather/${id}`);
//     await load();
//   };

//   useEffect(()=>{ load(); },[]);

//   return (
//     <div>
//       <h2>Saved Weather History</h2>
//       {items.map(rec => (
//         <div key={rec._id} className="history-item" style={{marginBottom:12}}>
//           <div><b>{rec.normalizedLocation || rec.city}</b></div>
//           <div>Saved: {new Date(rec.createdAt).toLocaleString()}</div>
//           {editing === rec._id ? (
//             <>
//               <input type="date" value={range.start} onChange={e=>setRange(r=>({...r,start:e.target.value}))} />
//               <input type="date" value={range.end} onChange={e=>setRange(r=>({...r,end:e.target.value}))} />
//               <button onClick={save}>Save</button>
//               <button onClick={()=>setEditing(null)}>Cancel</button>
//             </>
//           ) : (
//             <>
//               <div>Date Range: {(rec.dateRange?.start ? rec.dateRange.start.slice(0,10) : '-') }
//                 {" "}–{" "}
//                 {(rec.dateRange?.end ? rec.dateRange.end.slice(0,10) : '-') }
//               </div>
//               <button onClick={()=>startEdit(rec)}>Edit</button>
//               <button onClick={()=>remove(rec._id)}>Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import WeatherForm from "./WeatherForm";
// import { FaInfoCircle } from "react-icons/fa";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function Home() {
//   const [forecastData, setForecastData] = useState(null);
//   const [showAbout, setShowAbout] = useState(false);
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [currentWeather, setCurrentWeather] = useState('cloudy');
//   const [soundEnabled, setSoundEnabled] = useState(true);

//   // Weather animation effects
//   useEffect(() => {
//     if (forecastData) {
//       // Determine weather condition from forecast data
//       const mainCondition = forecastData.forecast?.[0]?.weather?.toLowerCase() || 'cloudy';
      
//       if (mainCondition.includes('rain') || mainCondition.includes('drizzle')) {
//         setCurrentWeather('rainy');
//         createRainEffect();
//       } else if (mainCondition.includes('snow')) {
//         setCurrentWeather('snowy');
//         createSnowEffect();
//       } else if (mainCondition.includes('thunder') || mainCondition.includes('storm')) {
//         setCurrentWeather('stormy');
//         createStormEffect();
//       } else if (mainCondition.includes('clear') || mainCondition.includes('sun')) {
//         setCurrentWeather('sunny');
//         createSunnyEffect();
//       } else {
//         setCurrentWeather('cloudy');
//       }
//     }
//   }, [forecastData]);

//   // Weather effect functions
//   const createRainEffect = () => {
//     const bgElements = document.getElementById('bgElements');
//     if (!bgElements) return;
    
//     // Clear existing rain
//     document.querySelectorAll('.rain').forEach(el => el.remove());
    
//     for (let i = 0; i < 50; i++) {
//       setTimeout(() => {
//         const rain = document.createElement('div');
//         rain.className = 'rain';
//         rain.style.left = Math.random() * 100 + '%';
//         rain.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
//         rain.style.animationDelay = Math.random() * 2 + 's';
        
//         bgElements.appendChild(rain);
        
//         setTimeout(() => {
//           if (rain.parentNode) rain.remove();
//         }, 3000);
//       }, i * 100);
//     }
//   };

//   const createSnowEffect = () => {
//     const bgElements = document.getElementById('bgElements');
//     if (!bgElements) return;
    
//     document.querySelectorAll('.snowflake').forEach(el => el.remove());
    
//     const snowSymbols = ['❄', '❅', '❆'];
//     for (let i = 0; i < 30; i++) {
//       setTimeout(() => {
//         const snowflake = document.createElement('div');
//         snowflake.className = 'snowflake';
//         snowflake.textContent = snowSymbols[Math.floor(Math.random() * snowSymbols.length)];
//         snowflake.style.left = Math.random() * 100 + '%';
//         snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
//         snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
//         bgElements.appendChild(snowflake);
        
//         setTimeout(() => {
//           if (snowflake.parentNode) snowflake.remove();
//         }, 5000);
//       }, i * 150);
//     }
//   };

//   const createStormEffect = () => {
//     createRainEffect();
    
//     // Lightning effect
//     const lightning = document.getElementById('lightning');
//     if (lightning) {
//       const flash = () => {
//         if (currentWeather === 'stormy' && Math.random() > 0.8) {
//           lightning.classList.add('flash');
//           setTimeout(() => lightning.classList.remove('flash'), 200);
//         }
//       };
      
//       const interval = setInterval(flash, 2000);
//       setTimeout(() => clearInterval(interval), 30000); // Stop after 30 seconds
//     }
//   };

//   const createSunnyEffect = () => {
//     const sun = document.getElementById('sun');
//     if (sun) {
//       sun.style.display = 'block';
//     }
//   };

//   const handleForecast = (data) => {
//     setForecastData(data);
//   };

//   const saveForecast = async () => {
//     if (!forecastData) return;
//     if (start && end && new Date(start) > new Date(end)) {
//       alert("Start date must be before end date");
//       return;
//     }
//     const loc = forecastData.location || {};
//     try {
//       await axios.post(`${API_BASE}/api/weather`, {
//         locationInput: loc.label || "",
//         location: {
//           name: loc.name, 
//           state: loc.state, 
//           country: loc.country,
//           lat: loc.lat, 
//           lon: loc.lon, 
//           label: loc.label
//         },
//         dateRange: (start || end) ? { start: start || null, end: end || null } : null,
//         forecast: forecastData.raw || forecastData
//       });
//       alert("Saved to history");
//     } catch (e) {
//       alert(e.response?.data?.error || "Failed to save");
//     }
//   };

//   const toggleSound = () => {
//     setSoundEnabled(!soundEnabled);
//   };

//   return (
//     <div className={`weather-container weather-${currentWeather}`} id="weatherContainer">
//       {/* Animated Background Elements */}
//       <div className="bg-elements" id="bgElements">
//         <div className="cloud cloud1"></div>
//         <div className="cloud cloud2"></div>
//         <div className="sun" id="sun" style={{display: 'none'}}></div>
//       </div>

//       {/* Lightning Effect */}
//       <div className="lightning" id="lightning"></div>

//       {/* Sound Toggle */}
//       <button className="sound-toggle" onClick={toggleSound}>
//         {soundEnabled ? '🔊' : '🔇'}
//       </button>

//       <div className="home">
//         <div className="header">
//           <h1 className="immersive-title">Immersive Weather Experience</h1>
//           <p className="immersive-subtitle">Feel the weather come alive</p>
          
//           <FaInfoCircle
//             className="info-icon"
//             onClick={() => setShowAbout(!showAbout)}
//             title="About this Weather App"
//             style={{ cursor: "pointer" }}
//           />
//         </div>

//         {showAbout && (
//           <div className="about glass">
//             <h3>About this Weather App</h3>
//             <p><b>Developed by:</b> GUDDETI SAI CHETAN KUMAR</p>
//             <p>This immersive weather app was created as part of the Product Manager Accelerator program.</p>
//             <p><b>About PM Accelerator:</b> PM Accelerator helps professionals transition into product management roles through hands-on experience, mentorship, and real-world product development.</p>
//             <a href="https://www.linkedin.com/company/pmaccelerator" target="_blank" rel="noopener noreferrer">
//               Visit PM Accelerator on LinkedIn
//             </a>
//           </div>
//         )}

//         <div className="search-container">
//           <WeatherForm onForecast={handleForecast} />
//         </div>

//         {forecastData && (
//           <div className="weather-display">
//             <div className="current-weather glass">
//               <div className="location">{forecastData.city?.name || forecastData.location?.name}</div>
              
//               {forecastData.forecast && forecastData.forecast[0] && (
//                 <>
//                   <div className="temperature" id="temperature">
//                     {forecastData.forecast[0].avgTemp || forecastData.forecast[0].temp}°C
//                   </div>
//                   <div className="description" id="description">
//                     {forecastData.forecast[0].weather}
//                   </div>
//                 </>
//               )}

//               <div className="forecast-container">
//                 {forecastData.forecast?.map((d, i) => (
//                   <div key={i} className="forecast-card glass">
//                     <div className="forecast-day">
//                       {i === 0 ? 'Today' : new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}
//                     </div>
//                     <div className="forecast-temp">
//                       {d.avgTemp ?? d.temp}°C
//                     </div>
//                     <div className="forecast-desc">{d.weather}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="save-section">
//                 <label>Start Date:&nbsp;
//                   <input 
//                     type="date" 
//                     value={start} 
//                     onChange={e => setStart(e.target.value)} 
//                     className="glass-input"
//                   />
//                 </label>
//                 &nbsp;&nbsp;
//                 <label>End Date:&nbsp;
//                   <input 
//                     type="date" 
//                     value={end} 
//                     onChange={e => setEnd(e.target.value)} 
//                     className="glass-input"
//                   />
//                 </label>
//                 &nbsp;&nbsp;
//                 <button className="btn save-btn" onClick={saveForecast}>Save to History</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function History() {
//   const [items, setItems] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [range, setRange] = useState({ start: "", end: "" });
//   const [loading, setLoading] = useState(true);

//   const load = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${API_BASE}/api/weather`);
//       setItems(data);
//     } catch (error) {
//       console.error('Failed to load history:', error);
//       alert('Failed to load search history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startEdit = (rec) => {
//     setEditing(rec._id);
//     setRange({
//       start: rec?.dateRange?.start ? rec.dateRange.start.slice(0, 10) : "",
//       end: rec?.dateRange?.end ? rec.dateRange.end.slice(0, 10) : "",
//     });
//   };

//   const save = async () => {
//     try {
//       // Validate date range
//       if (range.start && range.end && new Date(range.start) > new Date(range.end)) {
//         alert("Start date must be before end date");
//         return;
//       }

//       await axios.put(`${API_BASE}/api/weather/${editing}`, { 
//         dateRange: { ...range } 
//       });
//       setEditing(null);
//       await load();
//       alert("Date range updated successfully");
//     } catch (error) {
//       console.error('Failed to update record:', error);
//       alert('Failed to update record');
//     }
//   };

//   const remove = async (id) => {
//     if (!confirm("Are you sure you want to delete this record?")) {
//       return;
//     }
    
//     try {
//       await axios.delete(`${API_BASE}/api/weather/${id}`);
//       await load();
//       alert("Record deleted successfully");
//     } catch (error) {
//       console.error('Failed to delete record:', error);
//       alert('Failed to delete record');
//     }
//   };

//   const cancelEdit = () => {
//     setEditing(null);
//     setRange({ start: "", end: "" });
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getWeatherIcon = (description) => {
//     if (!description) return '🌤️';
//     const desc = description.toLowerCase();
//     if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
//     if (desc.includes('snow')) return '❄️';
//     if (desc.includes('storm') || desc.includes('thunder')) return '⛈️';
//     if (desc.includes('cloud')) return '☁️';
//     if (desc.includes('clear') || desc.includes('sun')) return '☀️';
//     return '🌤️';
//   };

//   useEffect(() => { 
//     load(); 
//   }, []);

//   if (loading) {
//     return (
//       <div className="weather-container weather-cloudy">
//         <div className="bg-elements">
//           <div className="cloud cloud1"></div>
//           <div className="cloud cloud2"></div>
//         </div>
//         <div className="history-page">
//           <div className="loading-container glass">
//             <div className="loading-spinner">⟳</div>
//             <p>Loading search history...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="weather-container weather-cloudy">
//       {/* Animated Background Elements */}
//       <div className="bg-elements">
//         <div className="cloud cloud1"></div>
//         <div className="cloud cloud2"></div>
//       </div>

//       <div className="history-page">
//         <div className="history-header">
//           <Link to="/" className="back-link glass">
//             ← Back to Weather
//           </Link>
//           <h1>Search History</h1>
//         </div>

//         {items.length === 0 ? (
//           <div className="empty-state glass">
//             <h2>No Search History</h2>
//             <p>Your weather searches will appear here once you save them.</p>
//             <Link to="/" className="btn">
//               Search Weather
//             </Link>
//           </div>
//         ) : (
//           <div className="history-grid">
//             {items.map(rec => (
//               <div key={rec._id} className="history-card glass">
//                 <div className="card-header">
//                   <div className="location-info">
//                     <div className="location-name">
//                       {getWeatherIcon(rec.forecast?.list?.[0]?.weather?.[0]?.description)}
//                       <span>{rec.normalizedLocation || rec.city}</span>
//                     </div>
//                     <div className="saved-date">
//                       Saved: {new Date(rec.createdAt).toLocaleDateString('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </div>
//                   </div>
                  
//                   <div className="card-actions">
//                     <button 
//                       className="icon-btn" 
//                       onClick={() => startEdit(rec)}
//                       title="Edit date range"
//                       disabled={editing === rec._id}
//                     >
//                       📅
//                     </button>
//                     <button 
//                       className="icon-btn delete-btn" 
//                       onClick={() => remove(rec._id)}
//                       title="Delete record"
//                       disabled={editing === rec._id}
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </div>

//                 <div className="date-range-section">
//                   {editing === rec._id ? (
//                     <div className="edit-form">
//                       <div className="date-inputs">
//                         <div className="input-group">
//                           <label>Start Date</label>
//                           <input 
//                             type="date" 
//                             value={range.start} 
//                             onChange={e => setRange(r => ({...r, start: e.target.value}))}
//                             className="glass-input"
//                           />
//                         </div>
//                         <div className="input-group">
//                           <label>End Date</label>
//                           <input 
//                             type="date" 
//                             value={range.end} 
//                             onChange={e => setRange(r => ({...r, end: e.target.value}))}
//                             className="glass-input"
//                           />
//                         </div>
//                       </div>
//                       <div className="form-actions">
//                         <button className="btn save-btn" onClick={save}>
//                           Save
//                         </button>
//                         <button className="btn cancel-btn" onClick={cancelEdit}>
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="date-display">
//                       <span className="date-label">Date Range:</span>
//                       <span className="date-value">
//                         {formatDate(rec.dateRange?.start)} – {formatDate(rec.dateRange?.end)}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Weather Preview */}
//                 {rec.forecast && (
//                   <div className="weather-preview">
//                     <div className="forecast-summary">
//                       {rec.forecast.list?.slice(0, 3).map((item, idx) => (
//                         <div key={idx} className="mini-forecast">
//                           <div className="forecast-date">
//                             {new Date(item.dt_txt).toLocaleDateString('en-US', { 
//                               month: 'short', 
//                               day: 'numeric' 
//                             })}
//                           </div>
//                           <div className="forecast-temp">
//                             {Math.round(item.main.temp)}°C
//                           </div>
//                           <div className="forecast-desc">
//                             {item.weather[0].description}
//                           </div>
//                         </div>
//                       )) || 
//                       // Fallback for simplified forecast format
//                       rec.forecast.slice(0, 3).map((day, idx) => (
//                         <div key={idx} className="mini-forecast">
//                           <div className="forecast-date">{day.date}</div>
//                           <div className="forecast-temp">{day.avgTemp || day.temp}°C</div>
//                           <div className="forecast-desc">{day.weather}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function History() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [range, setRange] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all history records
  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`${API_BASE}/api/weather`);
      // Defensive: ensure array
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        "Failed to load search history. Please check if the server is running."
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a record
  const startEdit = (rec) => {
    setEditing(rec._id);
    setRange({
      start: rec?.dateRange?.start ? rec.dateRange.start.slice(0, 10) : "",
      end: rec?.dateRange?.end ? rec.dateRange.end.slice(0, 10) : "",
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditing(null);
    setRange({ start: "", end: "" });
  };

  // Save date range changes
  const save = async () => {
    if (!range.start || !range.end) {
      alert("Please select both start and end dates.");
      return;
    }
    if (new Date(range.start) > new Date(range.end)) {
      alert("Start date must be before end date");
      return;
    }

    try {
      await axios.put(`${API_BASE}/api/weather/${editing}`, {
        dateRange: { ...range },
      });
      setEditing(null);
      await load(); // Refresh list after save to show updates
      alert("Date range updated successfully");
    } catch (err) {
      alert("Failed to update record");
    }
  };

  // Delete a record
  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`${API_BASE}/api/weather/${id}`);
      await load(); // Refresh list after deletion
      alert("Record deleted successfully");
    } catch (err) {
      alert("Failed to delete record");
    }
  };

  // Helper: format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // Helper: weather icon by description
  const getWeatherIcon = (desc) => {
    if (!desc) return "🌤️";
    const d = desc.toLowerCase();
    if (d.includes("rain") || d.includes("drizzle")) return "🌧️";
    if (d.includes("snow")) return "❄️";
    if (d.includes("storm") || d.includes("thunder")) return "⛈️";
    if (d.includes("cloud")) return "☁️";
    if (d.includes("clear") || d.includes("sun")) return "☀️";
    return "🌤️";
  };

  // Render forecast snippet for a record
  const renderForecast = (forecast) => {
    if (!forecast) return null;

    let list = [];

    if (forecast.list && Array.isArray(forecast.list)) {
      list = forecast.list.slice(0, 3);
    } else if (Array.isArray(forecast)) {
      list = forecast.slice(0, 3);
    }

    return (
      <div className="forecast-summary">
        {list.map((item, i) => {
          const date = item.dt_txt
            ? new Date(item.dt_txt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : item.date || `Day ${i + 1}`;

          const temp = item.main?.temp
            ? Math.round(item.main.temp)
            : item.avgTemp || item.temp || "--";

          const desc =
            item.weather?.[0]?.description || item.weather || "No data";

          return (
            <div key={i} className="mini-forecast">
              <div className="forecast-date">{date}</div>
              <div className="forecast-temp">{temp}°C</div>
              <div className="forecast-desc">{desc}</div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="weather-container weather-cloudy">
        <div className="bg-elements">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
        </div>
        <div className="history-page">
          <div className="loading-container glass">
            <div className="loading-spinner">⟳</div>
            <p>Loading search history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container weather-cloudy">
        <div className="bg-elements">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
        </div>
        <div className="history-page">
          <div className="history-header">
            <Link to="/" className="back-link glass">
              ← Back to Weather
            </Link>
            <h1>Search History</h1>
          </div>
          <div className="empty-state glass">
            <h2>⚠️ Connection Error</h2>
            <p>{error}</p>
            <button className="btn" onClick={load}>
              Try Again
            </button>
            <Link to="/" className="btn">
              Back to Weather
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-container weather-cloudy">
      <div className="bg-elements">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
      </div>

      <div className="history-page">
        <div className="history-header">
          <Link to="/" className="back-link glass">
            ← Back to Weather
          </Link>
          <h1>Search History ({items.length})</h1>
        </div>

        {items.length === 0 ? (
          <div className="empty-state glass">
            <h2>📊 No Search History</h2>
            <p>Your weather searches will appear here once you save them.</p>
            <p>
              Search for a location and use the "Save to History" button to
              start building your weather history.
            </p>
            <Link to="/" className="btn">
              🔍 Search Weather
            </Link>
          </div>
        ) : (
          <div className="history-grid">
            {items.map((rec) => (
              <div key={rec._id} className="history-card glass">
                <div className="card-header">
                  <div className="location-info">
                    <div className="location-name">
                      {getWeatherIcon(
                        rec.forecast?.list?.[0]?.weather?.[0]?.description ||
                          rec.forecast?.[0]?.weather
                      )}
                      <span>
                        {rec.normalizedLocation ||
                          rec.locationInput ||
                          rec.city ||
                          "Unknown Location"}
                      </span>
                    </div>
                    <div className="saved-date">
                      Saved:{" "}
                      {new Date(rec.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="icon-btn"
                      onClick={() => startEdit(rec)}
                      title="Edit date range"
                      disabled={editing === rec._id}
                    >
                      📅
                    </button>
                    <button
                      className="icon-btn delete-btn"
                      onClick={() => remove(rec._id)}
                      title="Delete record"
                      disabled={editing === rec._id}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="date-range-section">
                  {editing === rec._id ? (
                    <div className="edit-form">
                      <div className="date-inputs">
                        <div className="input-group">
                          <label>Start Date</label>
                          <input
                            type="date"
                            value={range.start}
                            onChange={(e) =>
                              setRange((r) => ({ ...r, start: e.target.value }))
                            }
                            className="glass-input"
                          />
                        </div>
                        <div className="input-group">
                          <label>End Date</label>
                          <input
                            type="date"
                            value={range.end}
                            onChange={(e) =>
                              setRange((r) => ({ ...r, end: e.target.value }))
                            }
                            className="glass-input"
                          />
                        </div>
                      </div>
                      <div className="form-actions">
                        <button className="btn save-btn" onClick={save}>
                          Save
                        </button>
                        <button className="btn cancel-btn" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="date-display">
                      <span className="date-label">Date Range:</span>{" "}
                      <span className="date-value">
                        {formatDate(rec.dateRange?.start)} –{" "}
                        {formatDate(rec.dateRange?.end)}
                      </span>
                    </div>
                  )}
                </div>

                {renderForecast(rec.forecast)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
