const fileUpload = require("express-fileupload");

const upload = fileUpload({
    createParentPath: true, // Создавать директорию, если её нет
});

module.exports = upload;
