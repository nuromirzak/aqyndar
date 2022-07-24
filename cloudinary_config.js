const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: 'aqyndar-images',
            allowedFormats: ['jpg', 'png', 'jpeg'],
        }
    }
});

const upload = multer({storage: storage});

module.exports = {
    cloudinary: cloudinary,
    storage: storage,
    upload: upload,
}