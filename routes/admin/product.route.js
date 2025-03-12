const express = require("express");
const multer = require('multer'); // multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.


const router = express.Router();



// const storageMulter = require("../../helpers/storageMulter"); // require storageMulter.js
// const upload = multer({ storage: storageMulter()}); // multer({dest: './public/uploads/'})
const upload = multer();

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validates"); // require product.validate.js
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware"); // require uploadCloud.middleware.js

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus); // :status and :id are dynamic params

router.patch("/change-multi", controller.changeMulti); // :status and :id are dynamic params

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create); // use get method to render create form

// use post method to handle create form submission
router.post(
    "/create",
    // upload.single("thumbnail") is a middleware that processes a single file upload. The file will be stored in the req.file object.
    upload.single("thumbnail"),
    // uploadCloud.upload is a middleware that uploads the file to Cloudinary.
    uploadCloud.upload,
    // validate.create_post is a middleware that validates the form data. If the form data is invalid, the user will be redirected back to the form.
    validate.create_post,
    // controller.create_post is a middleware that processes the form data. If the form data is valid, the user will be redirected to the product list page.
    controller.create_post
);

router.get("/edit/:id", controller.edit); // use get method to render edit form
// use patch method to handle edit form submission
router.patch("/edit/:id", upload.single("thumbnail"), uploadCloud.upload, validate.create_post, controller.edit_patch);

router.get("/detail/:id", controller.detail); // use get method to render detail page


module.exports = router;