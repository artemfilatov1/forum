const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports.getCommentById = async (ctx) => {
    try {
        const comments = ctx.db.Comments;
        const {id} = ctx.params;
        const comment = await comments.findOne({where: {id: id}});
        ctx.body = comment;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.getAllLikesFormComment = async (ctx) => {
    try {
        const comments = ctx.db.Comments;
        const likes = ctx.db.LikesToComments;
        const {id} = ctx.params;
        const comment = await comments.findByPk(id, {
            include: likes,
        });
        ctx.body = comment.LikesToComments;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.newLike = async (ctx) => {
    try {
        const comments = ctx.db.Comments;
        const likes = ctx.db.LikesToComments;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        const comment = await comments.findByPk(ctx.params.id);
        const prevLike = await likes.findOne({where: {
                userId: decode.id, commentId: comment.id
            }});
        if (prevLike !== null) {
            return;
        }
        const like = await likes.create({
            publish_date: new Date(),
            type: 'like',
            userId: decode.id,
            commentId: comment.id
        });
        ctx.body = like;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.updateComment = async (ctx) => {
    try {
        const comments = ctx.db.Comments;
        const body = ctx.request.body;
        const comment = await comments.findByPk(ctx.params.id);
        const newComment = await comment.update({
            content: body.content
        });
        ctx.body = newComment;
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.deleteComment = async (ctx) => {
    try {
        const comments = ctx.db.Comments;
        const comment = await comments.destroy({
            where: {
                id: ctx.params.id
            },
        });
        ctx.body = {message: 'deleted comment'};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.deleteLikeFromComment = async (ctx) => {
    try {
        const likes = ctx.db.LikesToComments;
        const token = getToken(ctx);
        const decode = await jwt.verify(token, config.token.accessToken);
        await likes.destroy({
            where: {
                commentId: ctx.params.id,
                userId: decode.id
            },
        });
        ctx.body = {message: 'deleted like from comment'};
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