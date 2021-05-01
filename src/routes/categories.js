const Router = require('koa-router')
const router = Router();

const controller = require('../controllers/categories');

router.get('/api/categories', controller.getAllCategories);
router.get('/api/categories/:id', controller.getCategoryById);
router.get('/api/categories/:id/posts', controller.getAllPostsFormCategory);
router.post('/api/categories', controller.newCategory);
router.patch('/api/categories/:id', controller.updateCategory);
router.delete('/api/categories/:id', controller.deleteCategory);

module.exports = router.routes();