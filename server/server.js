'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const mongoose    = require('mongoose');
const session     = require('express-session');

// create app and set up port
const app = express();
const port = process.env.PORT || 5000;

// db,secret config
const { db, secret } = require('./config/keys');

// connect to db
mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => console.log('connected to pratiquez database'))
  .catch(err => console.log(err));

// replace deprecated mongoose promise with nodes
mongoose.Promise = global.Promise;

// use sessions to track logins
app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: false
}));

// deal with possible CORS issues if accessed from different domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin X-Requested-With, Content-Type, Accept');
  next();
});

// log and parse request body to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// mount routes
const userRoutes    = require('./routes/user')(app);
const courseRoutes  = require('./routes/course')(app);
const sectionRoutes = require('./routes/section')(app);
const termRoutes    = require('./routes/term')(app);
const noteRoutes    = require('./routes/note')(app);
const videoRoutes   = require('./routes/video')(app);
const imageRoutes   = require('./routes/image')(app);

// send 404 if no route is matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Does Not Exist'
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
  next();
});

// start server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
