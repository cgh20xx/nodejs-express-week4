const UserModel = require('../models/UserModel');
const {
  successResponse,
  errorResponse,
} = require('../services/handleResponse');
const users = {
  /**
   * 取得所有使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.find
   * @param {Object} req
   * @param {Object} res
   */
  async getUsers(req, res) {
    const allUser = await UserModel.find();
    successResponse(res, allUser);
  },
  /**
   * 新增單筆使用者
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.create
   * @param {Object} req
   * @param {Object} res
   */
  async createUser(req, res) {
    try {
      const { body } = req;
      body.name = body.name?.trim(); // 頭尾去空白
      if (!body.name) throw new Error('[新增失敗] name 未填寫');
      const newUser = await UserModel.create({
        name: body.name,
        email: body.email,
        photo: body.photo,
      });
      successResponse(res, newUser);
    } catch (err) {
      errorResponse(res, err);
    }
  },
};
module.exports = users;
