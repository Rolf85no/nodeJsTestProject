const User = require('../models/User');

const checkLogin = async function (req, res) {
    try {
        const { username: reqUsername, password: reqPassword } = req.body;
        let user = await User.findOne({ username: reqUsername, password: reqPassword })
        if (!user) return res.status(400).json({ userFound: false })
        user.loggedIn = true;
        await user.save()
        res.json({ userFound: true });
    }
    catch (err) {
        console.log(err)
    }

}

const registerUser = async function (req, res) {
    try {
        const { username: reqUsername } = req.body;
        let user = await User.findOne({ username: reqUsername })
        if (user) return res.status(400).json({ userFound: true })
        const newUser = await User.create(req.body);
        if (!newUser) res.status(400).json('Could not create user');
        res.status(200).json({ userFound: true })
    }
    catch (err) {
        console.log(err)
    }

}

const logout = async (req, res) => {
    try {
        const { username: reqUsername } = req.body;
        const user = await User.findOne({ username: reqUsername });
        if (!user) return res.status(400).json(`No user with username: ${reqUsername}`);
        user.loggedIn = false;
        user.save();
        res.status(200).json({ user });

    }
    catch (err) {
        console.log(err);
    }
}

const updateUser = async (req, res) => {
    const options = {
        username: req.body.username,
        password: req.body.password,
        img: req.body.img
    }
    const user = await User.findOneAndUpdate({ _id: req.params.id }, options);
    if (!user) return res.status(400).json(`No user found`);
    res.status(200).json({ user });


}

module.exports = { checkLogin, registerUser, logout, updateUser }