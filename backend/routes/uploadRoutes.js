const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', upload.single('image'), (req, res) => {
    // Return relative path to be used by frontend
    // Assuming server serves 'uploads' folder at root or /uploads
    // We'll standardise on the frontend referring to standard URL
    // If backend is localhost:5000, and we explicitly want full URL or relative
    // Let's return relative path: /uploads/filename.jpg
    // But frontend might need to prepend backend URL if running on different port in dev
    // For MERN in dev usually we use proxy or full URL.
    // Let's return the plain path including the leading slash if mapped in express
    res.send(`/${req.file.path.replace(/\\/g, '/')}`);
});

module.exports = router;
