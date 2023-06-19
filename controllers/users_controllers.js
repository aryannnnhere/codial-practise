const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req , res){
    User.findById(req.params.id , function(err, user){
        return res.render('user_profile' , {
            title : "user profile",
            profile_user : user 
        });
    });
    
}
module.exports.update = async function(req , res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){
                if(err) {console.log('****Multer Error: ',err)};
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                    }


                    // this is sacing the path of the uplaoded file avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch(err){
            req.flash('error',err); 
            return res.redirect('back');
        }
    }else{
        req.flash('error' , 'Unauthorised!');
        return res.status(401).send('Unauthorised');
    }
}

//  render the sign in page
module.exports.signUp = function(req , res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    })
}

//  render the sign in page
module.exports.signIn = function(req , res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    })
}

//  get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                return res.redirect('/users/sign-in');
            }) 
            } else{
            return res.redirect('back');
        }
    });
}

//  sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res,next){
// logout function is given to req by passport js
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    });
    req.flash('success', 'Logged-out Successfully');
    return res.redirect('/');
}

