// // const express = require('express');
// // const dotenv = require('dotenv');
// // const mongoose = require('mongoose');
// // const cors = require('cors');

// // // Load env variables
// // dotenv.config();

// // // Initialize app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // const weatherRoutes = require('./routes/weatherRoutes');
// // app.use('/api/weather', weatherRoutes);

// // // MongoDB connection
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('✅ MongoDB connected'))
// //   .catch(err => console.error('❌ MongoDB connection error:', err));

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// // // backend/server.js
// // const express = require('express');
// // const dotenv = require('dotenv');
// // const cors = require('cors');
// // const connectDB = require('./config/db');

// // // routes
// // const weatherRoutes = require('./routes/weatherRoutes');

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // mount routes
// // app.use('/api/weather', weatherRoutes);

// // // healthcheck
// // app.get('/', (req, res) => res.send({ status: 'ok', env: process.env.NODE_ENV || 'dev' }));

// // // connect DB then start server
// // const PORT = process.env.PORT || 5000;
// // connectDB(process.env.MONGO_URI).then(() => {
// //   app.listen(PORT, () => {
// //     console.log(`🚀 Server running on port ${PORT}`);
// //   });
// // }).catch(err => {
// //   console.error('Failed to connect to DB, server not started.');
// // });


// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const weatherRoutes = require("./routes/weatherRoutes");

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // MongoDB connection
// // mongoose
// //   .connect("mongodb+srv://saichetanguddeti:chetan%402408@cluster0.alsqdjs.mongodb.net/weatherapp", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.error(err));

// // // Routes
// // app.use("/api/weather", weatherRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // const express = require('express');
// // const dotenv = require('dotenv');
// // const cors = require('cors');
// // const connectDB = require('./config/db');
// // const cors = require("cors");
// // app.use(cors());

// // dotenv.config();
// // connectDB();

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // app.use('/api/weather', require('./routes/weatherRoutes'));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Weather API routes
// app.use('/api/weather', require('./routes/weatherRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config(); // Load .env before using process.env

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use('/api/weather', require('./routes/weatherRoutes'));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/health', (_req, res) => res.json({ ok: true }));

// app.use('/api/weather', require('./routes/weatherRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/health', (_req, res) => res.json({ ok: true }));

// // IMPORTANT: filename must match exactly: routes/weatherRoutes.js
// app.use('/api/weather', require('./routes/weatherRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Allow all origins (for deployment/testing phase)
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());

// Health check endpoint (helps with Render uptime checks)
app.get('/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api/weather', require('./routes/weatherRoutes'));

// Use PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
