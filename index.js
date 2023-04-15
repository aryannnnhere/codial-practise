const express = require('express');
const app = express();
const port = 3000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 

// syntax for ejs layouts
app.use(expresslayouts);
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


app.use(express.static('./assets'));

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