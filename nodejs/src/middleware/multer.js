const multer = require('@koa/multer');
const path = require('path');

const limits = {
    // fileSize: 1024 * 1024,
    files: 1,
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) => {
        const type = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}.${type}`);
    },
});

module.exports = multer({ storage, limits });

