'use strict';
/**
 * Require our modules
 */
const express = require('express');
// Set the App
const app = express();
// Require our Main API Router
const apiV1 = require('./apiV1/router');

const healthcheck = require('./healthcheck/healthcheck');
const login = require('./authentication/login/login');
const getJokes = require('./getJokes/getJokes');
const verify = require('./authentication/verify/verify');
const caching = require('./caching/caching');
// Require our Global Middleware
require('./middleware/middleware')(app);

/**
 * Generic API's
 */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Use protected Endpoints
app.use('/*', require( './authentication/protected-endpoints/protected-enpoints' ));

// Login
app.use('/login', login);

// Verify Login
app.use('/login/verify', verify);

// Healthcheck
app.use('/healthcheck', healthcheck);

// //getJokes
// app.use('/getJokes',getJokes);

app.use('/getJokes', getJokes);

// Caching
app.use('/cache', caching);

// Add all the API - Version 1
app.use('/api/v1', apiV1);

// Error Handler
require('./errorhandler/errorhandler')(app);

// Export the app
module.exports = app;
