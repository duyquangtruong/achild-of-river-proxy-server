var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var swaggerUi = require('swagger-ui-express');
var swaggerSpec = require('./docs/swagger');

const connectDB = require("./config/db");

var indexRouter = require('./routes/index');
var projectRouter = require('./routes/project');
var introMediaRouter = require('./routes/introMedia');
var introMediaMobileRouter = require('./routes/introMediaMobile');
var personalRouter = require('./routes/personal');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', function (req, res) { res.json(swaggerSpec); });
app.use('/', indexRouter);
app.use("/api/projects", projectRouter);
app.use("/api/introMedia", introMediaRouter);
app.use("/api/introMediaMobile", introMediaMobileRouter);
app.use("/api/personal", personalRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
