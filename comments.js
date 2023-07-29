//Create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');
const { findOne } = require('../models/post');

//Create a comment
router.post('/posts/:postId/comments', isLoggedIn, async (req, res) => {
    try {
        //Find the post
        const post = await Post.findById(req.params.postId);
        //Create a comment
        const comment = new Comment(req.body.comment);
        //Add username and id to comment
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        //Save the comment
        await comment.save();
        //Associate the comment with the post
        post.comments.push(comment);
        await post.save();
        //Redirect to the show page
        res.redirect(`/posts/${post._id}`);
    } catch (err) {
        console.log(err.message);
        res.redirect('/posts');
    }
});

//Edit a comment
router.put('/posts/:postId/comments/:commentId', isLoggedIn, async (req, res) => {
    try {
        //Find the comment
        const comment = await Comment.findById(req.params.commentId);
        //Update the comment
        comment.text = req.body.comment.text;
        //Save the comment
        await comment.save();
        //Redirect to the show page
        res.redirect(`/posts/${req.params.postId}`);
    } catch (err) {
        console.log(err.message);
        res.redirect('/posts');
    }
});

//Delete a comment
router.delete('/posts/:postId/comments/:commentId', isLoggedIn, async (req, res) => {
    try {
        //Find the comment
        const comment = await Comment.findById(req.params.commentId);
        //Delete the comment
        await comment.remove();
        //Redirect to the show page
        res.redirect(`/posts/${req.params.postId}`);
    } catch (err) {
        console.log(err.message);
        res.redirect('/posts');
    }
});

module.exports = router;