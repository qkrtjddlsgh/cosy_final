var express = require('express');
var http = require('http');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var static = require('serve-static');
// Session 미들웨어 불러오기
var errorHandler = require('errorhandler');
var expressSession = require('express-session');

// **** passport 사용 ****
var passport = require('passport');
var flash = require('connect-flash');

// 모듈로 분리한 설정 파일 불러오기
var config = require('./config/config');
// 모듈로 분리한 데이터베이스 파일 불러오기
var database = require('./database/database');
// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log('config.server_port : %d', config.server_port);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname +'/public'));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

// **** passport 사용 ****
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//라우팅 정보를 읽어들여 라우팅 설정
var router = express.Router();
route_loader.init(app, router);

// 패스포트 설정
var configPassport = require('./config/passport');
configPassport(app, passport);

// 패스포트 라우팅 설정
var userPassport = require('./routes/user_passport');
userPassport(router, passport);

database.init(app, config);

var index = require('./routes/index');
var sentiment = require('./routes/CheckMember/sentiment');
// var users = require('./routes/users');
// var CheckLogin = require('./routes/CheckMember/CheckLogin');
// var CheckReg = require('./routes/CheckMember/CheckReg');

// var mongoose = require('mongoose');
// var db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', function(){
//   // Connected to mongodb server
//     console.log("Connected to mongodb server")
// });
//
// mongoose.connect('mongodb://localhost/cosy_db');

app.use('/', index);
app.use('/sentiment', sentiment);
// app.use('/users', users);
// app.use('/CheckLogin', CheckLogin);
// app.use('/CheckReg', CheckReg);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err.message);
});

module.exports = app;
