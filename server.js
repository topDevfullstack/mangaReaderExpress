// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const mangaRoutes = require('./routes/manga');

dotenv.config();

const app = express();

app.use('/api/users', userRoutes);
app.use('/api/manga', mangaRoutes);

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const title = 'Kanojyo to Himitsu to Koimoyou';
const baseUrl = 'https://api.mangadex.org';

// const resp = await axios({
//   method: 'GET',
//   url: `${baseUrl}/manga`,
//   params: {
//     title: title
//   }
// });

// console.log(resp.data.data.map(manga => manga.id));

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});