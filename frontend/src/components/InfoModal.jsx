// import React from 'react';

// export default function InfoModal({ open, onClose }) {
//   if (!open) return null;
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//         <h2>About this Weather App</h2>
//         <p><strong>Developed by GUDDETI SAI CHETAN KUMAR</strong></p>
//         <p>This weather app was created as part of the Product Manager Accelerator program.</p>

//         <h3>About PM Accelerator</h3>
//         <p>
//           PM Accelerator helps professionals transition into product management roles through
//           hands-on experience, mentorship, and real-world product development. Our program
//           accelerates your journey to becoming a successful product manager.
//         </p>
//         <p>
//           Visit PM Accelerator on LinkedIn:&nbsp;
//           <a href="https://www.linkedin.com/company/product-manager-accelerator/" target="_blank" rel="noreferrer">
//             Product Manager Accelerator
//           </a>
//         </p>

//         <button className="btn" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// }
// import React from 'react';

// export default function InfoModal({ open, onClose }) {
//   if (!open) return null;
  
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-card glass" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>🌤️ About this Weather App</h2>
//           <button className="close-btn" onClick={onClose} aria-label="Close modal">
//             ✕
//           </button>
//         </div>
        
//         <div className="modal-content">
//           <div className="developer-info">
//             <h3>👨‍💻 Developed by</h3>
//             <p className="developer-name">GUDDETI SAI CHETAN KUMAR</p>
//             <p>This immersive weather app was created as part of the Product Manager Accelerator program, featuring cutting-edge design and real-time weather animations.</p>
//           </div>

//           <div className="program-info">
//             <h3>🎯 About PM Accelerator</h3>
//             <p>
//               PM Accelerator helps professionals transition into product management roles through
//               hands-on experience, mentorship, and real-world product development. Our program
//               accelerates your journey to becoming a successful product manager.
//             </p>
            
//             <div className="features-list">
//               <h4>✨ App Features:</h4>
//               <ul>
//                 <li>🌧️ Immersive weather animations</li>
//                 <li>⚡ Real-time lightning effects</li>
//                 <li>☁️ Dynamic cloud movements</li>
//                 <li>❄️ Realistic snow and rain</li>
//                 <li>📱 Responsive glass morphism design</li>
//                 <li>🔊 Optional weather sound effects</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="modal-footer">
//             <a 
//               href="https://www.linkedin.com/company/product-manager-accelerator/" 
//               target="_blank" 
//               rel="noreferrer"
//               className="link-btn glass"
//             >
//               🔗 Visit PM Accelerator on LinkedIn
//             </a>
            
//             <button className="btn primary-btn" onClick={onClose}>
//               Continue Exploring Weather
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';

export default function InfoModal({ open, onClose }) {
  if (!open) return null;
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🌤️ About this Weather App</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          <div className="developer-info">
            <h3>👨‍💻 Developed by</h3>
            <p className="developer-name">GUDDETI SAI CHETAN KUMAR</p>
            <p>This immersive weather app was created as part of the Product Manager Accelerator program, featuring cutting-edge design and real-time weather animations.</p>
          </div>

          <div className="program-info">
            <h3>🎯 About PM Accelerator</h3>
            <p>
              PM Accelerator helps professionals transition into product management roles through
              hands-on experience, mentorship, and real-world product development. Our program
              accelerates your journey to becoming a successful product manager.
            </p>
            
            <div className="features-list">
              <h4>✨ App Features:</h4>
              <ul>
                <li>🌧️ Immersive weather animations</li>
                <li>⚡ Real-time lightning effects</li>
                <li>☁️ Dynamic cloud movements</li>
                <li>❄️ Realistic snow and rain</li>
                <li>📱 Responsive glass morphism design</li>
                <li>🔊 Optional weather sound effects</li>
              </ul>
            </div>
          </div>
          
          <div className="modal-footer">
            <a 
              href="https://www.linkedin.com/company/product-manager-accelerator/" 
              target="_blank" 
              rel="noreferrer"
              className="link-btn glass"
            >
              🔗 Visit PM Accelerator on LinkedIn
            </a>
            
            <button className="btn primary-btn" onClick={onClose}>
              Continue Exploring Weather
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}