// import React, { useState } from 'react';
// import WeatherForm from './WeatherForm';
// import WeatherCard from './WeatherCard';

// export default function Home() {
//   const [weather, setWeather] = useState(null); // raw API response or compact object
//   const [locationLabel, setLocationLabel] = useState('');

//   return (
//     <div className="home-page">
//       <div className="search-area">
//         <h1 className="title">Weather Forecast <span className="info" title="Click to learn more">ℹ️</span></h1>
//         <WeatherForm onResult={(res, label) => { setWeather(res); setLocationLabel(label || '') }} />
//       </div>

//       <div className="result-area">
//         {weather ? (
//           <WeatherCard weather={weather} locationLabel={locationLabel} />
//         ) : (
//           <div className="placeholder-card">Search for a location to see the weather forecast</div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import WeatherForm from "./WeatherForm";
// import WeatherCard from "./WeatherCard";
// import { FaInfoCircle } from "react-icons/fa";

// function Home() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [showAbout, setShowAbout] = useState(false);

//   return (
//     <div className="home">
//       <div className="header">
//         <h1>Weather App</h1>
//         <FaInfoCircle
//           className="info-icon"
//           onClick={() => setShowAbout(!showAbout)}
//           title="About this Weather App"
//         />
//       </div>

//       {showAbout && (
//         <div className="about">
//           <h3>About this Weather App</h3>
//           <p><b>Developed by:</b> GUDDETI SAI CHETAN KUMAR</p>
//           <p>This weather app was created as part of the Product Manager Accelerator program.</p>
//           <p><b>About PM Accelerator:</b> PM Accelerator helps professionals transition into product management roles through hands-on experience, mentorship, and real-world product development. Our program accelerates your journey to becoming a successful product manager.</p>
//           <a href="https://www.linkedin.com/company/pmaccelerator" target="_blank" rel="noopener noreferrer">
//             Visit PM Accelerator on LinkedIn
//           </a>
//         </div>
//       )}

//       <WeatherForm onWeatherFetched={setWeatherData} />
//       <WeatherCard weatherData={weatherData} />
//     </div>
//   );
// }

// export default Home;
// import React, { useState } from "react";
// import WeatherForm from "./WeatherForm";
// import { FaInfoCircle } from "react-icons/fa";
// import axios from "axios";

// function Home() {
//   const [forecast, setForecast] = useState(null);
//   const [showAbout, setShowAbout] = useState(false);

//   const handleForecast = (data) => {
//     setForecast(data);
//   };

//   const saveForecast = () => {
//     if (!forecast) return;
//     axios
//       .get(`/api/weather/forecast?lat=${forecast.city.coord.lat}&lon=${forecast.city.coord.lon}&save=true`)
//       .then(() => alert("Weather saved to history!"))
//       .catch(() => alert("Error saving weather"));
//   };

//   return (
//     <div className="home">
//       <div className="header">
//         <h1>Weather App</h1>
//         <FaInfoCircle
//           className="info-icon"
//           onClick={() => setShowAbout(!showAbout)}
//           title="About this Weather App"
//         />
//       </div>

//       {showAbout && (
//         <div className="about">
//           <h3>About this Weather App</h3>
//           <p><b>Developed by:</b> GUDDETI SAI CHETAN KUMAR</p>
//           <p>This weather app was created as part of the Product Manager Accelerator program.</p>
//           <p><b>About PM Accelerator:</b> PM Accelerator helps professionals transition into product management roles through hands-on experience, mentorship, and real-world product development. Our program accelerates your journey to becoming a successful product manager.</p>
//           <a
//             href="https://www.linkedin.com/company/pmaccelerator"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Visit PM Accelerator on LinkedIn
//           </a>
//         </div>
//       )}

//       <WeatherForm onForecast={handleForecast} />

//       {forecast && (
//         <div className="forecast">
//           <h2>{forecast.city.name} - 5 Day Forecast</h2>
//           <ul>
//             {forecast.forecast.map((day, idx) => (
//               <li key={idx}>
//                 {day.date} - {day.temp}°C - {day.weather}
//               </li>
//             ))}
//           </ul>
//           <button onClick={saveForecast}>Save to History</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

// import React, { useState } from "react";
// import WeatherForm from "./WeatherForm";
// import { FaInfoCircle } from "react-icons/fa";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function Home() {
//   const [forecastData, setForecastData] = useState(null);
//   const [showAbout, setShowAbout] = useState(false);
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");

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
//           name: loc.name, state: loc.state, country: loc.country,
//           lat: loc.lat, lon: loc.lon, label: loc.label
//         },
//         dateRange: (start || end) ? { start: start || null, end: end || null } : null,
//         forecast: forecastData.raw || forecastData   // keep raw payload for detail
//       });
//       alert("Saved to history");
//     } catch (e) {
//       alert(e.response?.data?.error || "Failed to save");
//     }
//   };

//   return (
//     <div className="home">
//       <div className="header">
//         <h1>Weather App</h1>
//         <FaInfoCircle
//           className="info-icon"
//           onClick={() => setShowAbout(!showAbout)}
//           title="About this Weather App"
//           style={{ cursor: "pointer" }}
//         />
//       </div>

//       {showAbout && (
//         <div className="about">
//           <h3>About this Weather App</h3>
//           <p><b>Developed by:</b> GUDDETI SAI CHETAN KUMAR</p>
//           <p>This weather app was created as part of the Product Manager Accelerator program.</p>
//           <p><b>About PM Accelerator:</b> PM Accelerator helps professionals transition into product management roles through hands-on experience, mentorship, and real-world product development.</p>
//           <a href="https://www.linkedin.com/company/pmaccelerator" target="_blank" rel="noopener noreferrer">
//             Visit PM Accelerator on LinkedIn
//           </a>
//         </div>
//       )}

//       <WeatherForm onForecast={handleForecast} />

//       {forecastData && (
//         <div className="forecast">
//           <h2>{forecastData.city?.name} — 5-Day Forecast</h2>
//           <ul>
//             {forecastData.forecast.map((d, i) => (
//               <li key={i}>{d.date} — {d.avgTemp ?? d.temp}°C — {d.weather}</li>
//             ))}
//           </ul>

//           <div style={{ marginTop: 12 }}>
//             <label>Start Date:&nbsp;
//               <input type="date" value={start} onChange={e=>setStart(e.target.value)} />
//             </label>
//             &nbsp;&nbsp;
//             <label>End Date:&nbsp;
//               <input type="date" value={end} onChange={e=>setEnd(e.target.value)} />
//             </label>
//             &nbsp;&nbsp;
//             <button className="btn" onClick={saveForecast}>Save to History</button>
//           </div>
//         </div>
//       )}
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

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
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
//       {/* Floating Navigation for Home Page */}
//       <div className="home-navigation">
//         <Link to="/history" className="nav-btn">
//           ⏱️ View History
//         </Link>
//       </div>

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


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WeatherForm from "./WeatherForm";
import { FaInfoCircle } from "react-icons/fa";
import InfoModal from "./InfoModal"; // Import the InfoModal component
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const [forecastData, setForecastData] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [currentWeather, setCurrentWeather] = useState('cloudy');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Weather animation effects
  useEffect(() => {
    if (forecastData) {
      // Determine weather condition from forecast data
      const mainCondition = forecastData.forecast?.[0]?.weather?.toLowerCase() || 'cloudy';
      
      if (mainCondition.includes('rain') || mainCondition.includes('drizzle')) {
        setCurrentWeather('rainy');
        createRainEffect();
      } else if (mainCondition.includes('snow')) {
        setCurrentWeather('snowy');
        createSnowEffect();
      } else if (mainCondition.includes('thunder') || mainCondition.includes('storm')) {
        setCurrentWeather('stormy');
        createStormEffect();
      } else if (mainCondition.includes('clear') || mainCondition.includes('sun')) {
        setCurrentWeather('sunny');
        createSunnyEffect();
      } else {
        setCurrentWeather('cloudy');
      }
    }
  }, [forecastData]);

  // Weather effect functions
  const createRainEffect = () => {
    const bgElements = document.getElementById('bgElements');
    if (!bgElements) return;
    
    // Clear existing rain
    document.querySelectorAll('.rain').forEach(el => el.remove());
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const rain = document.createElement('div');
        rain.className = 'rain';
        rain.style.left = Math.random() * 100 + '%';
        rain.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        rain.style.animationDelay = Math.random() * 2 + 's';
        
        bgElements.appendChild(rain);
        
        setTimeout(() => {
          if (rain.parentNode) rain.remove();
        }, 3000);
      }, i * 100);
    }
  };

  const createSnowEffect = () => {
    const bgElements = document.getElementById('bgElements');
    if (!bgElements) return;
    
    document.querySelectorAll('.snowflake').forEach(el => el.remove());
    
    const snowSymbols = ['❄', '❅', '❆'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowSymbols[Math.floor(Math.random() * snowSymbols.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        bgElements.appendChild(snowflake);
        
        setTimeout(() => {
          if (snowflake.parentNode) snowflake.remove();
        }, 5000);
      }, i * 150);
    }
  };

  const createStormEffect = () => {
    createRainEffect();
    
    // Lightning effect
    const lightning = document.getElementById('lightning');
    if (lightning) {
      const flash = () => {
        if (currentWeather === 'stormy' && Math.random() > 0.8) {
          lightning.classList.add('flash');
          setTimeout(() => lightning.classList.remove('flash'), 200);
        }
      };
      
      const interval = setInterval(flash, 2000);
      setTimeout(() => clearInterval(interval), 30000); // Stop after 30 seconds
    }
  };

  const createSunnyEffect = () => {
    const sun = document.getElementById('sun');
    if (sun) {
      sun.style.display = 'block';
    }
  };

  const handleForecast = (data) => {
    setForecastData(data);
  };

  const saveForecast = async () => {
    if (!forecastData) return;
    if (start && end && new Date(start) > new Date(end)) {
      alert("Start date must be before end date");
      return;
    }
    const loc = forecastData.location || {};
    try {
      await axios.post(`${API_BASE}/api/weather`, {
        locationInput: loc.label || "",
        location: {
          name: loc.name, 
          state: loc.state, 
          country: loc.country,
          lat: loc.lat, 
          lon: loc.lon, 
          label: loc.label
        },
        dateRange: (start || end) ? { start: start || null, end: end || null } : null,
        forecast: forecastData.raw || forecastData
      });
      alert("Saved to history");
    } catch (e) {
      alert(e.response?.data?.error || "Failed to save");
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleInfoClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`weather-container weather-${currentWeather}`} id="weatherContainer">
      {/* Floating Navigation for Home Page */}
      <div className="home-navigation">
        <Link to="/history" className="nav-btn">
          ⏱️ View History
        </Link>
      </div>

      {/* Animated Background Elements */}
      <div className="bg-elements" id="bgElements">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="sun" id="sun" style={{display: 'none'}}></div>
      </div>

      {/* Lightning Effect */}
      <div className="lightning" id="lightning"></div>

      {/* Sound Toggle */}
      <button className="sound-toggle" onClick={toggleSound}>
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      <div className="home">
        <div className="header">
          <h1 className="immersive-title">Immersive Weather Experience</h1>
          <p className="immersive-subtitle">Feel the weather come alive</p>
          
          {/* Enhanced Info Icon with better visibility */}
          <div className="info-icon-container">
            <FaInfoCircle
              className="info-icon"
              onClick={handleInfoClick}
              title="About this Weather App"
            />
          </div>
        </div>

        {/* Replaced old About section with Modal */}
        <InfoModal open={showModal} onClose={handleCloseModal} />

        <div className="search-container">
          <WeatherForm onForecast={handleForecast} />
        </div>

        {forecastData && (
          <div className="weather-display">
            <div className="current-weather glass">
              <div className="location">{forecastData.city?.name || forecastData.location?.name}</div>
              
              {forecastData.forecast && forecastData.forecast[0] && (
                <>
                  <div className="temperature" id="temperature">
                    {forecastData.forecast[0].avgTemp || forecastData.forecast[0].temp}°C
                  </div>
                  <div className="description" id="description">
                    {forecastData.forecast[0].weather}
                  </div>
                </>
              )}

              <div className="forecast-container">
                {forecastData.forecast?.map((d, i) => (
                  <div key={i} className="forecast-card glass">
                    <div className="forecast-day">
                      {i === 0 ? 'Today' : new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}
                    </div>
                    <div className="forecast-temp">
                      {d.avgTemp ?? d.temp}°C
                    </div>
                    <div className="forecast-desc">{d.weather}</div>
                    {/* Added info icon to forecast cards */}
                    <div className="forecast-info">
                      <FaInfoCircle 
                        className="forecast-info-icon" 
                        title={`Weather details for ${i === 0 ? 'Today' : new Date(d.date).toLocaleDateString('en', { weekday: 'long' })}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="save-section">
                <label>Start Date:&nbsp;
                  <input 
                    type="date" 
                    value={start} 
                    onChange={e => setStart(e.target.value)} 
                    className="glass-input"
                  />
                </label>
                &nbsp;&nbsp;
                <label>End Date:&nbsp;
                  <input 
                    type="date" 
                    value={end} 
                    onChange={e => setEnd(e.target.value)} 
                    className="glass-input"
                  />
                </label>
                &nbsp;&nbsp;
                <button className="btn save-btn" onClick={saveForecast}>Save to History</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}