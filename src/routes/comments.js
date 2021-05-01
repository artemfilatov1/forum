const Router = require('koa-router')
const router = Router();

const controller = require('../controllers/comments');

router.get('/api/comments/:id', controller.getCommentById);
router.get('/api/comments/:id/likes', controller.getAllLikesFormComment);
router.post('/api/comments/:id/like', controller.newLike);
router.patch('/api/comments/:id', controller.updateComment);
router.delete('/api/comments/:id', controller.deleteComment);
router.delete('/api/comments/:id/like', controller.deleteLikeFromComment);

module.exports = router.routes();