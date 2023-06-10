const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user'); 
const {request} = require('express');


//  authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback: true
    },
  async function(req, email , password , done){
        // finding a user and establishing the identity
        // first email is the email we are looking for that is stored in database
        // second email is the email we passed in this function along with password
        let user;
        try {
            user = await  User.findOne({email : email})
        }
        catch (err){
            req.flash('error',err);
            return done(err);
                }
                // user.password is for password stored in database(actual password)
    
                // 2 password is for the password typed in the browser nowwhich is passed in the 
                // function along with email.
            
        
         if(!user || user.password != password) {

             req.flash("error" , "Invalid Username/password");
                
              
            return done(null , false);
            }
            return done(null , user);

        }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done ){
    done(null, user.id);
});



// deserializing the user from the key in the cookies 
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }
        return done(null, user);
    });

});

// check the user is authenticated

passport.checkAuthentication = function(req , res , next){
//  if the user is signed in, then pass the req to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){

    if(req.isAuthenticated()){
/*    req.user contains the current signed in user from the session cookies and 
       we are just sending this to locals for the views */
        res.locals.user = req.user;
    }
    next();
} 




module.exports = passport;
