const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try {
       let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post 
                },
                message : "Post Created!"
            });
        }
        req.flash('success' , 'Post Published!');

        return res.redirect('back');

    } catch(err){
        req.flash('error',err); 
        return res.redirect('back');

    }
 
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id , function(err, post){
        //  .id means coverting the object id into string
        if(err){
            console.log('post is not find');
        }
        if(post.user == req.user.id){
            post.deleteOne();

            Comment.deleteMany({post: req.params.id}, function(err){
                
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            post_id : req.params.id
                        },
                        message : "Post deleted"
                    })
                }
                req.flash('success' , 'Post deleted!');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}