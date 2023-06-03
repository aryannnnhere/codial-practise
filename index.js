const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie  
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));


// syntax for ejs layouts
app.use(expresslayouts);
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


// set up the view engine - ejs 
app.set('view engine', 'ejs');
app.set('views', './views');

// mongostore is used to store the session cookie in the db
app.use(session({
    name :'codial',
    // ToDo change the secret before deployment in production mode
    secret : 'blahsomehing',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        //    mongoUrl: 'mongodb://localhost:27017/bookworm',
            mongooseConnection : db,
            // mongoUrl: process.env.CONNECTIONSTRING ,
            // mongoUrl: 'mongodb://localhost/test-app',
            autoRemove : 'disabled'

        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log('server is running on:' , port);
});