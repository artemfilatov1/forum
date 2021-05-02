module.exports.getAllCategories = async (ctx) => {
    try {
        const categories = ctx.db.Categories;
        const all = await categories.findAll();
        ctx.body = {all: all};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.getCategoryById = async (ctx) => {
    try {
        const categories = ctx.db.Categories;
        const {id} = ctx.params;
        const category = await categories.findOne({where: {id: id}});
        ctx.body = {category: category};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.getAllPostsFormCategory = async (ctx) => {
    try {
        const categories = ctx.db.Categories;
        const posts = ctx.db.Posts;
        const {id} = ctx.params;
        const category = await categories.findByPk(id, {
            include: posts,
        });
        ctx.body = {all: category.Posts};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.newCategory = async (ctx) => {
    try {
        const categories = ctx.db.Categories;
        const body = ctx.request.body;
        const category = await categories.create({
            title: body.title,
            description: body.description
        });
        ctx.body = {category: category};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.updateCategory = async (ctx) => {
    try {
        const categories = ctx.db.Categories;
        const body = ctx.request.body;
        const category = await categories.findByPk(ctx.params.id);
        const newCategory = await category.update({
            title: body.title,
            description: body.description
        });
        ctx.body = {category: newCategory};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

module.exports.deleteCategory = async (ctx) => {
    try {
        const categories = ctx.db.Categories;
        const category = await categories.destroy({
            where: {
                id: ctx.params.id
            },
        });
        ctx.body = {message: 'deleted category'};
        ctx.status = 200;
    } catch (err){
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}