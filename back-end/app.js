var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var imagesRouter = require('./routes/images');
var ordersRouter = require('./routes/orders');
var cartsRouter = require('./routes/carts');
var loginRouter = require('./routes/login');
var checkoutRouter = require('./routes/checkout');

var app = express();
var PORT = 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/login', loginRouter);
app.use('/api/checkout', checkoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(404).send('Page not found :(');
});

app.listen(PORT, () => {
  console.log('[+] Server running on Port ' + PORT);
})