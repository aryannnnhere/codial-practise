const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password ){
            return res.json(422,{
                message:"Invalid Username or Password"
            });
        }

        return res.json(200,{
            message: "Sign In Successfully , here is your token keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codial' , {expiresIn:'100000'})
            } 

        }) 
    } catch (err) {
         console.log("******" , err);
        
    }
    
   
}