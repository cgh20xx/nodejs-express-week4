const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

// 取得所有使用者
router.get('/users', UsersController.getUsers);
// 新增單筆使用者
router.post('/user', UsersController.createUser);

module.exports = router;
