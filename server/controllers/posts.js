const Post = require('../models/Post');
const User = require('../models/User');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        const users = await User.find({}).select(['-password']);
        if (!posts.length > 0) res.status(404).json('Could not find posts')
        if (!users.length > 0) res.status(404).json('Could not find users');
        res.json({ posts, users })
    }
    catch (err) {
        console.log(err);
    }

}

const getPost = async (req, res) => {
    try {
        const { username: requestName } = req.params;
        const posts = await Post.find({ username: requestName });
        if (!posts.length > 0) res.status(404).json('Could not find posts')
        res.status(200).json({ posts })
    }
    catch (err) {
        console.log(err)
    }

}

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        if (!post) res.status(404).json('Could not create post');
        res.status(200).json('Created Post')
    }

    catch (err) {
        return console.log(err)
    }


}
const updatePost = async (req, res) => {
    try {
        const { id: requestID } = req.params;
        const post = await Post.findOne({ _id: requestID })
        if (!post) return res.status(404).json(`No post with id ${id}`);
        req.body.reply && post.replies.push(req.body.reply);
        if (req.body.post) post.post = req.body.post
        await post.save();
        res.status(200).json({ post });
    }
    catch (err) {
        console.log(err);
    }

}

const deletePost = async (req, res) => {
    try {
        const { id: requestID } = req.params;
        const post = await Post.findOneAndDelete({ _id: requestID })
        if (!post) res.status(404).json(`No post with id ${id}`);
        res.status(200).json('Post deleted')
    }

    catch (err) {
        console.log(err);
    }

}



module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
}

