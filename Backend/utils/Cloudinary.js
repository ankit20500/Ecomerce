const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localfilepath, userId,existavatar) => {
    try {
        if (!localfilepath) return null;

        if (existavatar) {
            await cloudinary.uploader.destroy(existavatar);
        }

        const uploadResult = await cloudinary.uploader.upload(localfilepath, {
            public_id: `user_${userId}/avatar`,
            folder: 'user_avatars',
            resource_type: 'auto',
        });
        fs.unlinkSync(localfilepath); // Delete local file after successful upload

        return {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url, // Use secure_url instead of path
        };
    } catch (error) {
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath); // Delete local file if upload fails
        }
        console.log('Error occurred in Cloudinary upload:', error);
        return null;
    }
};

module.exports = uploadOnCloudinary;
