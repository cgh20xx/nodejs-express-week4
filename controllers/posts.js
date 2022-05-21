const PostModel = require('../models/PostModel');
const {
  successResponse,
  errorResponse,
} = require('../services/handleResponse');
const post = {
  /**
   * 查詢所有資料
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.find
   * @param {Object} param
   */
  async getPosts(req, res) {
    const allPost = await PostModel.find();
    successResponse(res, allPost);
  },
  /**
   * 新增單筆資料
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.create
   * @param {Object} param
   */
  async createPost(req, res) {
    try {
      const { body } = req;
      body.content = body.content?.trim(); // 頭尾去空白
      if (!body.content) throw new Error('[新增失敗] content 未填寫');
      // 只開放新增 name tags type image conent
      const newPost = await PostModel.create({
        name: body.name,
        tags: body.tags,
        type: body.type,
        image: body.image,
        content: body.content,
      });
      successResponse(res, newPost);
    } catch (err) {
      errorResponse(res, err);
    }
  },
  /**
   * 刪除所有資料
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany
   * @param {Object} param
   */
  async deletePosts(req, res) {
    await PostModel.deleteMany({});
    successResponse(res, []);
  },
  /**
   * 刪除單筆資料
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
   * @param {Object} param
   */
  async deletePostById(req, res) {
    try {
      const id = req.params.id;
      const deletePostById = await PostModel.findByIdAndDelete(id);
      if (!deletePostById) throw new Error('[刪除失敗] 沒有此 id');
      successResponse(res, deletePostById);
    } catch (err) {
      errorResponse(res, err);
    }
  },
  /**
   * 修改單筆資料
   * Doc:https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
   * @param {Object} param
   */
  async updatePostById(req, res) {
    try {
      const { body } = req;
      const id = req.params.id;
      body.content = body.content?.trim(); // 頭尾去空白
      if (body.name) throw new Error('[修改失敗] 不可修改 name');
      if (!body.content) throw new Error('[修改失敗] content 未填寫');
      // 只開放修改 tags type image conent (name 不可改)
      const updatePostById = await PostModel.findByIdAndUpdate(
        id,
        {
          tags: body.tags,
          type: body.type,
          image: body.image,
          content: body.content,
        },
        {
          // 加這行才會返回更新後的資料，否則為更新前的資料。
          returnDocument: 'after',
          // update 相關語法預設 runValidators: false，需手動設寪 true。Doc:https://mongoosejs.com/docs/validation.html#update-validators
          runValidators: true,
        }
      );
      if (!updatePostById) throw new Error('[修改失敗] 沒有此 id');
      successResponse(res, updatePostById);
    } catch (err) {
      errorResponse(res, err);
    }
  },
};
module.exports = post;
