const Router = require('koa-router')
const router = Router();

const controller = require('../controllers/posts');
const schemas = require('../schemas/schemas')
const joi = require('../middleware/joi');
const role = require('../middleware/role');
const multer = require('../middleware/multer')

router.get('/api/posts', controller.getAllPosts);
router.get('/api/posts/:id', controller.getPostById);
router.get('/api/posts/:id/comments', controller.getAllCommentsFormPost);
router.post('/api/posts/:id/comments', controller.newComment);
router.get('/api/posts/:id/categories', controller.getAllCategoriesFromPost);
router.get('/api/posts/:id/like', controller.getAllLikesFromPost);
router.post('/api/posts/', controller.newPost);
router.post('/api/posts/:id/like', controller.newLike);
router.patch('/api/posts/:id', controller.updatePost);
router.delete('/api/posts/:id', controller.deletePost);
router.delete('/api/posts/:id/like', controller.deleteLikeFromPost);

module.exports = router.routes();