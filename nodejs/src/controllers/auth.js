const jwt = require('jsonwebtoken');
const config = require('../config');
const argon2 = require('argon2');
const mail = require('../email/email');

module.exports.register = async ctx => {
    try {
        const users = ctx.db.Users;
        const user = ctx.request.body;
        user.password = await argon2.hash(user.password);
        const usrDb = await users.create(user);
        const token = await jwt.sign({id: usrDb.id}, config.token.verifyEmailToken, {expiresIn: "1h"});
        const url = `http://localhost:3000/register/verify-email/${token}`
        await mail.sendToVerify(user.email, url, 'click to verify account', '');
        ctx.body = {user: usrDb, token: token};
        ctx.status = 201;
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = 400;
    }
}

module.exports.registerVerify = async (ctx) => {
    try {
        const users = ctx.db.Users;
        let { token } =  await ctx.params;
        const decoded = await jwt.verify(token, config.token.verifyEmailToken);
        const usrDb = await users.findOne({ where: { id: decoded.id } });
        await usrDb.update({isVerified: true});
        ctx.body = { msg: 'email successfully verified!' };
    } catch (err){
        ctx.status = 400;
        ctx.body = { error: err.message };
    }
}

module.exports.login = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const user = ctx.request.body
        const usrDb = await users.findOne({ where: { login: user.login } });
        if (usrDb === null) throw new Error('wrong account login');
        let ok = await argon2.verify(usrDb.password, user.password);
        if (!ok) throw new Error('wrong account password');
        if (!usrDb.isVerified) throw new Error('u must to verify account');
        const token = await jwt.sign({id: usrDb.id}, config.token.accessToken, {expiresIn: '7d'});
        ctx.body = {token: token, user: usrDb};
    } catch (err){
        ctx.status = 401;
        ctx.body = { error: err.message };
    }
}

module.exports.passwordReset = async (ctx) => {
    try {
        const users = ctx.db.Users;
        let { email } = ctx.request.body;
        const usrDB = await users.findOne({ where: { email: email } });
        const token = await jwt.sign({id: usrDB.id}, config.token.verifyEmailToken, {expiresIn: "1h"});
        const url = `/api/auth/password-reset/${token}`
        await mail.sendToVerify(usrDB.email, url, 'click to account password', '');
        ctx.body = token;
    } catch (err){
        ctx.status = 400;
        ctx.body = { error: err.message };
    }
}

module.exports.passwordResetVerify = async (ctx) => {
    try {
        const users = ctx.db.Users;
        let { token } =  await ctx.params;
        const decoded = await jwt.verify(token, config.token.verifyEmailToken);
        const usrDb = await users.findOne({ where: { id: decoded.id } });
        const hash = await argon2.hash(usrDb.password)
        await usrDb.update({password: hash});
        ctx.body = { msg: 'password successfully changed!' };
    } catch (err){
        ctx.status = 400;
        ctx.body = { error: err.message };
    }
}