const faker = require('faker');
const db = require('../models/index');

module.exports.fakePosts = async (n) => {
    const users = await db.Users.findAll();
    let ids = [];
    for (let user of users) ids.push(user.id);

    const arr = [];
    for (let i = 0; i < n; i++){
        const random_title = faker.random.words();
        const random_publish_date = faker.date.past();
        const random_status = faker.random.arrayElement(['live', 'inactive']);
        const random_content = faker.lorem.paragraphs();
        const random_userId = faker.random.arrayElement(ids);
        await db.Posts.create({
            title: random_title,
            publish_data: random_publish_date,
            status: random_status,
            content: random_content,
            userId: random_userId
        });
    }
    return arr;
}