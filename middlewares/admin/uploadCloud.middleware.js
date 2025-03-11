const cloudinary = require('cloudinary').v2; // cloudinary is a cloud-based image and video management service
const streamifier = require('streamifier'); // streamifier is a utility for streaming data

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// End Cloudinary config

// Cloudinary upload
module.exports.upload = (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            req.body[req.file.fieldname] = result.secure_url; // req.body[req.file.fieldname] is the path to the uploaded file. req.file.fieldname is the name of the file input field. result.secure_url is the URL of the uploaded file.
            next(); // next() is a function that calls the next middleware in the stack.
        }

        upload(req);
    } else {
        next();
    }
}