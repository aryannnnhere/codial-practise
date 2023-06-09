const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
        req.flash('error',err); 
        return res.redirect('back');
    }
        req.flash('success' , 'Post Published!');

        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id , function(err, post){
        //  .id means coverting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                req.flash('success' , 'Post deleted!');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}