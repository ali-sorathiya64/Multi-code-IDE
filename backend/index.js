#!/usr/bin/env node

// Import required modules
const app = require('./app'); // Import your Express app
const http = require('http'); // Built-in module to create an HTTP server

// Set debug namespace for logging
const debug = require('debug')('backend:server');

// Get the port from environment variables or default to 3000
const port = process.env.PORT || 3000;
app.set('port', port); // Set the port in the Express app

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle errors gracefully
server.on('error', (error) => {
  // Check the type of error
  if (error.syscall !== 'listen') {
    throw error; // If it's not related to listening, rethrow the error
  }

  // Determine if the port is a named pipe or a number
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // Handle specific error codes
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1); // Exit the process with failure code
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1); // Exit the process with failure code
      break;
    default:
      throw error; // Re-throw the error for unknown cases
  }
});

// Log that the server is listening
server.on('listening', () => {
  const addr = server.address(); // Get server address information
  const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
  console.log(`Server is listening on ${bind}`);
});
