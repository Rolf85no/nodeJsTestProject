const express = require('express');
const router = express.Router();

const { getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/posts')
const { checkLogin, registerUser, logout, updateUser } = require('../controllers/users')

router.route('/').get(getAllPosts).post(createPost).patch(logout);
router.route('/login').post(checkLogin);
router.route('/user/:id').patch(updateUser);
router.route('/register').post(registerUser);
router.route('/:username').get(getPost)
router.route('/:id').patch(updatePost).delete(deletePost);

module.exports = router;