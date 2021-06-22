const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports.getAllPosts = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const all = await posts.findAll();
        ctx.body = all;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.getPostById = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const {id} = ctx.params;
        const post = await posts.findOne({where: {id: id}});
        ctx.body = post;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.getAllCommentsFormPost = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const comments = ctx.db.Comments;
        const {id} = ctx.params;
        const post = await posts.findByPk(id, {
            include: comments,
        });
        ctx.body = post.Comments;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.newComment = async (ctx) => {
    try {
        const comments = ctx.db.Comments;
        const {id} = ctx.params;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        const body = ctx.request.body;

        const comment = await comments.create({
            publish_date: new Date(),
            content: body.content,
            userId: decode.id,
            postId: id
        })
        ctx.body = comment;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.getAllCategoriesFromPost = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const {id} = ctx.params;
        const post = await posts.findOne({
            where: {id : id},
            include: ctx.db.Categories,
        });
        ctx.body = post.Categories;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.getAllLikesFromPost = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const {id} = ctx.params;
        const post = await posts.findOne({
            where: {id : id},
            include: ctx.db.LikesToPosts,
        });
        let likes = [], dislikes = [];
        for (let i = 0; i < post.LikesToPosts.length; i++){
            if (post.LikesToPosts[i].type === 'like') likes.push(post.LikesToPosts[i]);
            else dislikes.push(post.LikesToPosts[i]);
        }
        ctx.body = {likes: likes, dislikes: dislikes};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.newPost = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const body = ctx.request.body;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        const post = await posts.create({
            title: body.title,
            publish_date: new Date(),
            status: 'live',
            content: body.content,
            userId: decode.id
        });
        body.categories.map(async i => {
            const category = await ctx.db.Categories.findOne({where: {id: i.id}});
            await post.addCategories(category);
        })

        ctx.body = post;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.newLike = async (ctx) => {//TODO rating
    try {
        const posts = ctx.db.Posts;
        const users = ctx.db.Users;
        const likes = ctx.db.LikesToPosts;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        const post = await posts.findByPk(ctx.params.id);
        const prevLike = await likes.findOne({where: {
            userId: decode.id, postId: post.id
        }});
        const one = await users.findOne({ where: { id: post.userId } })
        const body = ctx.request.body;

        if (prevLike !== null) {
            await module.exports.deleteLikeFromPost(ctx);
            if (prevLike.type !== body.type){
                await module.exports.newLike(ctx);
                if (body.type === 'like') await one.update({rating: one.rating+2});
                else await one.update({rating: one.rating-2});
            } else {
                if (body.type === 'like') await one.update({rating: one.rating-1});
                else await one.update({rating: one.rating+1});
            }
            return;
        } else {
            if (body.type === 'like') await one.update({rating: one.rating+1});
            else await one.update({rating: one.rating-1});
        }
        await likes.create({
            publish_date: new Date(),
            type: body.type,
            userId: decode.id,
            postId: post.id
        });
        await module.exports.getAllLikesFromPost(ctx);
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.updatePost = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const body = ctx.request.body;
        const post = await posts.findByPk(ctx.params.id);
        const newPost = await post.update({
            title: body.title,
            content: body.content,
        });
        ctx.body = newPost;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.deletePost = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const post = await posts.destroy({
            where: {
                id: ctx.params.id
            },
        });
        ctx.body = {message: 'deleted post'};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.deleteLikeFromPost = async (ctx) => {
    try {
        const likes = ctx.db.LikesToPosts;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        await likes.destroy({
            where: {
                postId: ctx.params.id,
                userId: decode.id
            },
        });
        await module.exports.getAllLikesFromPost(ctx);
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

function getToken(ctx){
    const authHeader = ctx.get('authorization');
    return authHeader && authHeader.split(' ')[1];
}

