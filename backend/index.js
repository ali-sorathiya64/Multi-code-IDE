#!/usr/bin/env node

// Import required modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const debug = require('debug')('backend:server');
const createError = require('http-errors');

// Import routers and database connection
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectDB = require('./config/db');

// Initialize and connect to the database
connectDB();

// Create the Express app
const app = express();

// Set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Handle React frontend routing
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

// Set the port
const port = process.env.PORT || 3000;
app.set('port', port);

// Create the HTTP server
const server = http.createServer(app);

// Start listening
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Log when the server starts listening
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
  console.log(`Server is listening on ${bind}`);
});

module.exports = app;
