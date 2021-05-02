const faker = require('faker');
const db = require('../models/index');

module.exports.fakeCategories = async (n) => {
    for (let i = 0; i < n; i++){
        const random_title = faker.random.word();
        const random_description = faker.lorem.paragraphs();
        await db.Categories.create({
            title: random_title,
            description: random_description
        })
    }
}