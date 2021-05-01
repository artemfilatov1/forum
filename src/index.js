const koa = require('koa');
const routes = require('./routes/main');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const db = require('./models/index');
const seed = require('./seeders/set');

const app = new koa();

app.use(bodyParser({ multipart: true, extended: false }));
app.use(async (ctx, next) => { ctx.db = db; await next() })
app.use(routes.routes())

app.listen(config.app.port, async () => {
    await db.sequelize.sync({force: true});
    await seed.set(5);
    console.log('db sync');
    console.log(`app listening at http://localhost:${config.app.port}`);
});