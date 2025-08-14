// backend/config/db.js
// const mongoose = require('mongoose');

// const connectDB = async (mongoUri) => {
//   try {
//     await mongoose.connect(mongoUri, {
//       // mongoose 7+ uses sensible defaults, options not required
//     });
//     console.log('✅ MongoDB connected');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
