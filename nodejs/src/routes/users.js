const Router = require('koa-router')
const router = Router();

const controller = require('../controllers/users');
const schemas = require('../schemas/schemas')
const joi = require('../middleware/joi');
const role = require('../middleware/role');
const multer = require('../middleware/multer')

router.get('/api/users', controller.getAllUsers);
router.get('/api/users/:user_id', controller.getUserById);
router.post('/api/users', role.isAdmin, joi(schemas.admin_schema), controller.createUser);
router.post('/api/users/avatar', multer.single('avatar'), role.isUser, controller.setAvatar);
router.patch('/api/users/:user_id', joi(schemas.admin_schema), controller.updateUser);
router.delete('/api/users/:user_id', controller.deleteUser);

module.exports = router.routes();