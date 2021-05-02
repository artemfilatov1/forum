const fakeU = require('../faker/users');
const fakeP = require('../faker/posts');
const fakeC = require('../faker/categories');
const fakePC = require('../faker/postscategories');
const fakeCm = require('../faker/comments');
const fakeLP = require('../faker/likestoposts');
const fakeLC = require('../faker/likestocomments');

async function set(n){
    await fakeU.fakeUsers(n);
    await fakeP.fakePosts(n);
    await fakeC.fakeCategories(n);
    await fakePC.fakePostsCategories(n);
    await fakeCm.fakeComments(n);
    await fakeLP.fakeLikesToPosts(n);
    await fakeLC.fakeLikesToComments(n);
}

module.exports.set = set;