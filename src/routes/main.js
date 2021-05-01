const Router = require('koa-router')
const auth = require('./auth');
const users = require('./users');
const posts = require('./posts');
const categories = require('./categories');
const comments = require('./comments');

const router = new Router();
const allRouters = new Router();

allRouters.use(auth);
allRouters.use(users);
allRouters.use(posts);
allRouters.use(categories);
allRouters.use(comments);

router.use(allRouters.routes());
module.exports = router;