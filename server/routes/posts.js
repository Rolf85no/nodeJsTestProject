const express = require('express');
const router = express.Router();

const { getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/posts')
const { checkLogin, registerUser, logout, updateUser } = require('../controllers/users')

router.route('/').get(getAllPosts).post(createPost);
router.route('/login').patch(checkLogin).post(registerUser);
router.route('/user/:id').patch(updateUser);
router.route('/logout').patch(logout);
router.route('/:username').get(getPost)
router.route('/:id').patch(updatePost).delete(deletePost);

module.exports = router;