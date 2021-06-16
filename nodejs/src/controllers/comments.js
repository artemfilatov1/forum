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
        const {id} = ctx.params;
        const comment = await comments.findByPk(id, {
            include: ctx.db.LikesToComments,
        });
        let likes = [], dislikes = [];
        for (let i = 0; i < comment.LikesToComments.length; i++){
            if (comment.LikesToComments[i].type === 'like') likes.push(comment.LikesToComments[i]);
            else dislikes.push(comment.LikesToComments[i]);
        }
        ctx.body = {likes: likes, dislikes: dislikes};
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
        const body = ctx.request.body;

        const prevLike = await likes.findOne({where: {
                userId: decode.id, commentId: comment.id
            }});
        if (prevLike !== null) {
            await module.exports.deleteLikeFromComment(ctx);
            if (prevLike.type !== body.type){
                await module.exports.newLike(ctx);
            }
            return;
        }
        await likes.create({
            publish_date: new Date(),
            type: body.type,
            userId: decode.id,
            commentId: comment.id
        });
        await module.exports.getAllLikesFormComment(ctx);
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