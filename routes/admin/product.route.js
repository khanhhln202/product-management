const express = require("express");
const multer  = require('multer');
const router = express.Router();

const storageMulter = require("../../helpers/storageMulter"); // require storageMulter.js
const upload = multer({ storage: storageMulter()}); // multer({dest: './public/uploads/'})

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus); // :status and :id are dynamic params

router.patch("/change-multi", controller.changeMulti); // :status and :id are dynamic params

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create); // use get method to render create form

router.post("/create", upload.single("thumbnail"), controller.create_post); // use post method to handle create form submission


module.exports =  router;