const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));


// syntax for ejs layouts
app.use(expresslayouts);
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);




// use express router
app.use('/', require('./routes'));


// set up the view engine - ejs 
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log('server is running on:' , port);
});