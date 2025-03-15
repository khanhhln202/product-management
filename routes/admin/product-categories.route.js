const express = require("express");
const multer = require('multer'); // multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.

const router = express.Router();
const upload = multer(); // upload is a middleware that processes multipart/form-data.

const controller = require("../../controllers/admin/product-categories.controller");
const validate = require("../../validates/admin/product-categories.validates"); // require product-categories.validate.js
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware"); // require uploadCloud.middleware.js

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.create_post,
    controller.create_post
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.create_post,
    controller.edit_patch
);

module.exports = router;