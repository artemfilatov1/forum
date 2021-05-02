const Router = require('koa-router')
const router = Router();

const controller = require('../controllers/auth')
const schemas = require('../schemas/schemas')
const middleware = require('../middleware/joi');

router.post('/api/auth/register', middleware(schemas.user_schema), controller.register);
router.get('/api/auth/register/verify-email/:token', controller.registerVerify);
router.post('/api/auth/login', controller.login)
router.post('/api/auth/password-reset', controller.passwordReset);
router.get('/api/auth/password-reset/:token', middleware(schemas.password_schema), controller.passwordResetVerify);

module.exports = router.routes();
