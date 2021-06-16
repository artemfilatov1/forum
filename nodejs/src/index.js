const koa = require('koa');
const routes = require('./routes/main');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const db = require('./models/index');
const seed = require('./seeders/set');
const cors = require('@koa/cors');
const serve = require ('koa-static');
const path = require ('path');

const app = new koa();

app.use(serve(path.join(__dirname, '../public')));
app.use(bodyParser({ multipart: true, extended: false }));
app.use(async (ctx, next) => { ctx.db = db; await next() })
app.use(cors());
app.use(routes.routes())

app.listen(config.app.port, async () => {
    // await db.sequelize.sync({force: true}); //or
    await db.sequelize.sync();
    // await seed.set(5);
    console.log('db sync');
    console.log(`app listening at http://localhost:${config.app.port}`);
});