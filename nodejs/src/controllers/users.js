const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.getAllUsers = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const all = await users.findAll();
        ctx.body = all;
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = 400;
    }
}

module.exports.getUserById = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const {user_id} = await ctx.params;
        const one = await users.findOne({ where: { id: user_id } })
        ctx.body = one;
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = 400;
    }
}

module.exports.createUser = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const user = ctx.request.body;
        user['isVerified'] = true;
        const login = await users.findOne({ where: { login: user.login } });
        const email = await users.findOne({ where: { email: user.email } });
        if (login !== null) throw new Error('login is busy');
        if (email !== null) throw new Error('email is busy');
        const usr = await users.create(user);
        ctx.body = usr;
        ctx.status = 201;
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = 400;
    }
}

module.exports.setAvatar = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const avatar = ctx.file.filename;
        const id =  ctx.authToken;
        const one = await users.findOne({ where: { id: id } });
        await one.update({profile_picture: avatar});
        ctx.body = { msg: 'set user avatar successfully' }
        ctx.status = 200;
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = 400;
    }
}

module.exports.updateUser = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const user = ctx.request.body;
        user.password = await argon2.hash(user.password);
        const {user_id} = await ctx.params;
        const one = await users.findOne({ where: { id: user_id } })
        await one.update(user);
        ctx.body = { msg: 'update user successfully!' };
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = 400;
    }
}

module.exports.deleteUser = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const {user_id} = await ctx.params;
        const one = await users.destroy({ where: { id: user_id } })
        ctx.body = { msg: 'delete user successfully!' };
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = 400;
    }
}

