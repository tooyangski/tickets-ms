const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// connect to db
connectDB();

//server setup
const PORT = process.env.PORT || 9000;
const app = express();

//setup decoding types
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//import routes
const userRoutes = require('./routes/userRoutes');

//routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// serve frontend
if (process.env.NODE_ENV === 'production') {
  // set build folder as static
  // creates a static files for the production
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  //send the index.html to serve
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.underline.bold)
);
