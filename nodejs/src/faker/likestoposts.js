const faker = require('faker');
const db = require('../models/index');

module.exports.fakeLikesToPosts = async (n) => {
    const users = await db.Users.findAll();
    let ids = [];
    for (let user of users) ids.push(user.id);

    const posts = await db.Posts.findAll();
    let idsP = [];
    for (let post of posts) idsP.push(post.id);

    for (let i = 0; i < n; i++){
        const random_title = faker.random.words();
        const random_publish_date = faker.date.past();
        const random_type = faker.random.arrayElement(['like', 'dislike']);
        const random_content = faker.lorem.paragraphs();
        const random_userId = faker.random.arrayElement(ids);
        const random_postId = faker.random.arrayElement(idsP);
        await db.LikesToPosts.create({
            publish_date: random_publish_date,
            type: random_type,
            userId: random_userId,
            postId: random_postId
        });
    }
}