const User = require('../models/User');
const Post = require('../models/Post');

const checkLogin = async function (req, res) {
    try {
        let user = await User.findOne({ username: req.body.username, password: req.body.password })
        if (!user) return res.status(400).json({ success: false, message: 'Could not find user' })
        user.loggedIn = true;
        await user.save()
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, message: err.message })
    }

}

const registerUser = async function (req, res) {
    try {
        const { username: reqUsername } = req.body;
        let checkUser = await User.findOne({ username: reqUsername })
        if (checkUser) return res.status(400).json({ success: false, message: 'Username is taken' })
        const user = await User.create(req.body);
        if (!user) return res.status(400).json({ success: false, message: 'Could not create user' });
        res.status(200).json({ success: true, user })
    }
    catch (err) {
        console.log(err)
    }

}

const logout = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ Success: false, Message: `No user with username: ${reqUsername}` });
        user.loggedIn = false;
        user.save();
        res.status(200).json({ success: true });

    }
    catch (err) {
        console.log(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const options = {
            username: req.body.username,
            password: req.body.password,
            img: req.body.img
        }
        const user = await User.findOneAndUpdate({ _id: req.params.id }, options);
        if (!user) return res.status(400).json({ success: false, message: `No user found` });
        await Post.updateMany(
            { "userID": { $in: req.params.id } },
            { $set: { "username": req.body.username } },
            { multi: true }
        );
        // let optionsUpdate = { multi: true, upsert: true }
        // Post.updateMany({ userID: req.params.id }, { username: req.body.username }, optionsUpdate);
        res.status(200).json({ success: true, message: 'User updated', user });
    }

    catch (err) {
        console.log(err);
    }
}

module.exports = { checkLogin, registerUser, logout, updateUser }