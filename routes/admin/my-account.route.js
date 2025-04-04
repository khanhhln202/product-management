const express = require("express");
const multer = require("multer"); // multer is a middleware for handling multipart/form-data, which is used for uploading files.

const router = express.Router();

const upload = multer(); // multer() creates a new multer instance with default options.

const controller = require("../../controllers/admin/my-account.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch("/edit", upload.single("avatar"), uploadCloud.upload, controller.edit_patch);

module.exports = router; 