// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import Home from './components/Home';
// import History from './components/History';

// export default function App() {
//   return (
//     <div className="app-root">
//       <header className="app-header">
//         <Link to="/" className="brand">Weather Forecast</Link>
//         <nav>
//           <Link to="/history" className="history-btn">⏱️ Search History</Link>
//         </nav>
//       </header>

//       <main className="app-main">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/history" element={<History />} />
//         </Routes>
//       </main>

//       <footer className="app-footer">
//         <small>Developed by You • Weather data powered by OpenWeatherMap</small>
//       </footer>
//     </div>
//   );
// }


// import React from 'react';
// import { Routes, Route, Link, useLocation } from 'react-router-dom';
// import Home from './components/Home';
// import History from './components/History';

// export default function App() {
//   const location = useLocation();
//   const isHomePage = location.pathname === '/';

//   return (
//     <div className="app-root">
//       {/* Header - only show on non-home pages or overlay on home */}
//       {!isHomePage && (
//         <header className="app-header">
//           <Link to="/" className="brand">🌤️ Weather Forecast</Link>
//           <nav>
//             <Link to="/history" className="history-btn">
//               ⏱️ Search History
//             </Link>
//           </nav>
//         </header>
//       )}

//       {/* Main Content */}
//       <main className={isHomePage ? "app-main-home" : "app-main"}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/history" element={<History />} />
//         </Routes>
//       </main>

//       {/* Footer - only show on non-home pages */}
//       {!isHomePage && (
//         <footer className="app-footer">
//           <small>
//             Developed by GUDDETI SAI CHETAN KUMAR • Weather data powered by OpenWeatherMap
//           </small>
//         </footer>
//       )}
//     </div>
//   );
// }


import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import History from './components/History';

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-root">
      {/* Header - only show on non-home pages */}
      {!isHomePage && (
        <header className="app-header">
          <Link to="/" className="brand">🌤️ Weather Forecast</Link>
          <nav>
            <Link to="/history" className="history-btn">
              ⏱️ Search History
            </Link>
          </nav>
        </header>
      )}

      {/* Main Content - No margin/padding for home page to avoid white space */}
      <main className={isHomePage ? "app-main-home" : "app-main"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>

      {/* Footer - only show on non-home pages */}
      {!isHomePage && (
        <footer className="app-footer">
          <small>
            Developed by GUDDETI SAI CHETAN KUMAR • Weather data powered by OpenWeatherMap
          </small>
        </footer>
      )}
    </div>
  );
}