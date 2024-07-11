const multer = require("multer");

// Ensure the temp directory exists
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/temp'); // Set your desired upload directory
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use original file name or generate a unique name
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
