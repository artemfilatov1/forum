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
        const posts = ctx.db.Posts;
        const comments = ctx.db.Comments;
        const {id} = ctx.params;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        const body = ctx.request.body;
        const post = await posts.findOne({ where: { id: id } });
        await comments.create({
            publish_date: new Date(),
            content: body.content,
            userId: decode.id,
            postId: id
        })
        ctx.body = post;
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
        ctx.body = post.LikesToPosts;
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
        const category = await ctx.db.Categories.findOne({where: {id: body.categories}});
        await post.addCategories(category);
        ctx.body = post;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.newLike = async (ctx) => {
    try {
        const posts = ctx.db.Posts;
        const likes = ctx.db.LikesToPosts;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        const post = await posts.findByPk(ctx.params.id);
        const prevLike = await likes.findOne({where: {
            userId: decode.id, postId: post.id
        }});
        if (prevLike !== null) {
            await module.exports.deleteLikeFromPost(ctx);
            return;
        }
        const like = await likes.create({
            publish_date: new Date(),
            type: 'like',
            userId: decode.id,
            postId: post.id
        });
        ctx.body = like;
        ctx.status = 200;
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
        ctx.body = {message: 'deleted like from post'};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

function getToken(ctx){
    const authHeader = ctx.get('authorization');
    return authHeader && authHeader.split(' ')[1];
}

