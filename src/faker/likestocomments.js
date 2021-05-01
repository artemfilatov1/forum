const faker = require('faker');
const db = require('../models/index');

module.exports.fakeLikesToComments = async (n) => {
    const users = await db.Users.findAll();
    let ids = [];
    for (let user of users) ids.push(user.id);

    const comments = await db.Comments.findAll();
    let idsC = [];
    for (let comment of comments) idsC.push(comment.id);

    const arr = [];
    for (let i = 0; i < n; i++){
        const random_title = faker.random.words();
        const random_publish_date = faker.date.past();
        const random_type = faker.random.arrayElement(['like', 'dislike']);
        const random_content = faker.lorem.paragraphs();
        const random_userId = faker.random.arrayElement(ids);
        const random_commentId = faker.random.arrayElement(idsC);
        await db.LikesToComments.create({
            publish_date: random_publish_date,
            type: random_type,
            userId: random_userId,
            commentId: random_commentId
        });
    }
    return arr;
}