const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.getAllUsers = async (ctx) => {
    try {
        const users = ctx.db.Users;
        const {limit, offset} = ctx.query;
        const all = await users.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {}
        });
        ctx.body = {users: all.rows, count: all.count};
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
        ctx.body = await users.create(user);
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
        ctx.body = avatar;
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
        console.log({user})
        const {user_id} = await ctx.params;
        const one = await users.findOne({ where: { id: user_id } })
        let update = null;
        if (user.login){
            const login = await users.findOne({ where: { login: user.login } });
            if (login !== null) throw new Error('login is busy');
            update = await one.update({login: user.login});
        }
        if (user.full_name){
            update = await one.update({full_name: user.full_name});
        }
        if (user.password){
            user.password = await argon2.hash(user.password);
            update = await one.update({password: user.password});
        }
        if (user.email){
            const email = await users.findOne({ where: { email: user.email } });
            if (email !== null) throw new Error('email is busy');
            update = await one.update({email: user.email});
        }
        if (user.role){
            update = await one.update({role: user.role});
        }
        ctx.body = update;
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

