module.exports.profile = function(req , res){
    return res.render('user_profile' , {
        title : "user profile"
    });
}

module.exports.signUp = function(req , res){
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    })
}


module.exports.signIn = function(req , res){
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    })
}

