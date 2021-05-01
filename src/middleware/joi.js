const Joi = require('joi');

const joi = (schema, property) => {
    return async (ctx, next) => {
        const { error } = await schema.validate(ctx.request.body);
        const valid = error == null;

        if (valid) {
            await next();
        } else {
            const { details } = error;
            let message = details.map(i => i.message).join(',');
            // message = message.replace(/"/g, "|")

            console.log("error", message);
            ctx.status = 422;
            ctx.body = { error: message };
        }
    }
}
module.exports = joi;