const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts');

// 查詢所有資料
router.get('/posts', PostController.getPosts);

// 新增單筆資料
router.post('/post', PostController.createPost);

// 刪除所有資料
router.delete('/posts', PostController.deletePosts);

// 刪除單筆資料
router.delete('/post/:id', PostController.deletePostById);

// 修改單筆資料
router.patch('/post/:id', PostController.updatePostById);

module.exports = router;
