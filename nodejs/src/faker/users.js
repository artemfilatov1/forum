const faker = require('faker');
const argon2 = require('argon2');
const db = require('../models/index');

module.exports.fakeUsers = async (n) => {
    for (let i = 0; i < n; i++){
        const random_login = faker.random.word();
        const random_password = await argon2.hash(faker.internet.password());
        const random_name = faker.name.findName();
        const random_email = faker.internet.email();
        const random_role = faker.random.arrayElement(['user', 'admin']);
        const random_isVerified = faker.random.arrayElement([true, false]);
        await db.Users.create({
            login: random_login,
            password: random_password,
            full_name:  random_name,
            email: random_email,
            role: random_role,
            isVerified: random_isVerified,
        })
    }
}