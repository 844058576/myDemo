var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var myRouter = require('./routes/sheet');
var singerRouter = require('./routes/singer');
var rankRouter = require('./routes/rankList');
var audioRouter = require('./routes/audio');
var songRouter = require('./routes/song');
var backRouter = require('./routes/backend');

var app = express();

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/resouce/', express.static(path.join(__dirname, './resouce/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/')); // 默认就是 ./views 目录

app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，(true)我都默认直接给你分配一把钥匙
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', myRouter);
app.use('/', singerRouter);
app.use('/', rankRouter);
app.use('/', audioRouter);
app.use('/', songRouter);
app.use('/', backRouter);
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
  res.status(err.status || 500);
  res.render('error.html',{error:err});//根据错误状态码渲染不同模板数据
});

module.exports = app;
