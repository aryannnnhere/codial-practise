const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('./../models/user');

// tell passsport to use a new Strategy for google login
passport.use(new googleStrategy({
    clientID: "550424252167-gm7oacd8elb3a3oprkg6n5s50m58kld8.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:3000/users/auth/google/callback"
    },
    function(accessToken , refreshToken , profile , done){
        // find a user
        User.findOne( {email: profile.emails[0].value}).exec(function(err, user){
            if(err){ console.log('err in google satrategyv passport', err); return; }
             
            if(user){
                // if found, set this user as req.user
                console.log(user);
                return done(null, user);
            }else{
                // create the user and set it as req.user
                // console.log("**********");
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                } , function(err , user){
                    if(err){ console.log('err in creating user', err); return; }

                    return done(null , user);
                });
            }
        });
    }
));

module.exports = passport;