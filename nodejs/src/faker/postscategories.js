const faker = require('faker');
const db = require('../models/index');

module.exports.fakePostsCategories = async (n) => {
    const categories = await db.Categories.findAll();
    let idsC = [];
    for (let category of categories) idsC.push(category.id);

    const posts = await db.Posts.findAll();
    let idsP = [];
    for (let post of posts) idsP.push(post.id);

    const arr = [];
    for (let i = 0; i < n; i++){
        const random_categoryId = faker.random.arrayElement(idsC);
        const random_postId = faker.random.arrayElement(idsP);
        await db.PostsCategories.create({
            categoryId: random_categoryId,
            postId: random_postId
        });
    }
    return arr;
}