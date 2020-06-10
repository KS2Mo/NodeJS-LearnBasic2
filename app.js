const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config/index');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const staffRouter = require('./routes/staff');
const shopRouter = require('./routes/shop');

//import middleware
const errorHandler = require('./middleware/errorHandler')

const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
//mongodb+srv://kassarin:kassarin@ks2mo-slgji.mongodb.net/test?authSource=admin&replicaSet=KS2Mo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
//
mongoose.connect(config.MONGODB_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false
});

app.use(logger('dev'));
app.use(express.json({
    limit:'50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/staff', staffRouter);
app.use('/shop', shopRouter);

app.use(errorHandler);
module.exports = app;
